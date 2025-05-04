using AIResumeGenerator.Application.Common.Interfaces;
using AIResumeGenerator.Application.DTOs;
using AIResumeGenerator.Application.Features.Resume.Commands.CreateResume;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using EducationDto = AIResumeGenerator.Application.DTOs.EducationDto;
using ExperienceDto = AIResumeGenerator.Application.DTOs.ExperienceDto;

namespace AIResumeGenerator.Infrastructure.Repositories
{
    public class ResumeRepository(IDbConnection dbConnection) : IResumeRepository
    {
        // Create Resume Method
        public async Task<Guid> CreateResumeAsync(CreateResumeCommand command)
        {
            var resumeId = Guid.NewGuid();
            dbConnection.Open();
            using var transaction = dbConnection.BeginTransaction();

            try
            {
                var resumeSql = @"INSERT INTO Resumes (Id, FullName, Email, Phone, Summary)
                                  VALUES (@Id, @FullName, @Email, @Phone, @Summary);";

                await dbConnection.ExecuteAsync(resumeSql, new
                {
                    Id = resumeId,
                    command.FullName,
                    command.Email,
                    command.Phone,
                    command.Summary
                }, transaction);

                // Insert experiences, education, and skills
                await InsertExperiencesAsync(command, resumeId, transaction);
                await InsertEducationsAsync(command, resumeId, transaction);
                await InsertSkillsAsync(command, resumeId, transaction);

                transaction.Commit();
                return resumeId;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
            finally
            {
                dbConnection.Close();
            }
        }

        // Method to insert experiences
        private async Task InsertExperiencesAsync(CreateResumeCommand command, Guid resumeId, IDbTransaction transaction)
        {
            var experienceSql = @"INSERT INTO Experiences (Id, ResumeId, Company, Role, Duration, Description)
                                  VALUES (@Id, @ResumeId, @Company, @Role, @Duration, @Description);";

            foreach (var exp in command.Experiences)
            {
                await dbConnection.ExecuteAsync(experienceSql, new
                {
                    Id = Guid.NewGuid(),
                    ResumeId = resumeId,
                    exp.Company,
                    exp.Role,
                    exp.Duration,
                    exp.Description
                }, transaction);
            }
        }

        // Method to insert educations
        private async Task InsertEducationsAsync(CreateResumeCommand command, Guid resumeId, IDbTransaction transaction)
        {
            var educationSql = @"INSERT INTO Educations (Id, ResumeId, Institution, Degree, Year, Description)
                                 VALUES (@Id, @ResumeId, @Institution, @Degree, @Year, @Description);";

            foreach (var edu in command.Educations)
            {
                await dbConnection.ExecuteAsync(educationSql, new
                {
                    Id = Guid.NewGuid(),
                    ResumeId = resumeId,
                    edu.Institution,
                    edu.Degree,
                    edu.Year,
                    edu.Description
                }, transaction);
            }
        }

        // Method to insert skills
        private async Task InsertSkillsAsync(CreateResumeCommand command, Guid resumeId, IDbTransaction transaction)
        {
            var skillSql = @"INSERT INTO Skills (Id, ResumeId, Skill)
                             VALUES (@Id, @ResumeId, @Skill);";

            foreach (var skill in command.Skills)
            {
                await dbConnection.ExecuteAsync(skillSql, new
                {
                    Id = Guid.NewGuid(),
                    ResumeId = resumeId,
                    Skill = skill.SkillName
                }, transaction);
            }
        }

        // Get Resume By Id
        public async Task<ResumeDto?> GetResumeByIdAsync(Guid id)
        {
            var query = @"SELECT r.Id, r.FullName, r.Email, r.Phone, r.Summary, 
                          e.Company, e.Role, e.Duration, e.Description AS ExperienceDescription,
                          edu.Institution, edu.Degree, edu.Year, edu.Description AS EducationDescription,
                          s.Skill AS SkillName
                          FROM Resumes r
                          LEFT JOIN Experiences e ON r.Id = e.ResumeId
                          LEFT JOIN Educations edu ON r.Id = edu.ResumeId
                          LEFT JOIN Skills s ON r.Id = s.ResumeId
                          WHERE r.Id = @Id";

            var result = await dbConnection.QueryAsync<ResumeDto, ExperienceDto, EducationDto, SkillDto, ResumeDto>(
                query,
                (resume, experience, education, skill) =>
                {
                    // Map results to ResumeDto
                    resume.Experiences.Add(experience);
                    resume.Educations.Add(education);
                    resume.Skills.Add(skill);
                    return resume;
                },
                new { Id = id },
                splitOn: "ExperienceDescription,EducationDescription,SkillName"
            );

            return result.FirstOrDefault();
        }
    }
}
