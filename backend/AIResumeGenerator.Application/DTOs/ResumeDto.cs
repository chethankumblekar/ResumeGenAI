using AIResumeGenerator.Application.Features.Resume.Commands.CreateResume;

namespace AIResumeGenerator.Application.DTOs;

public class ResumeDto
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;

    public List<SkillDto> Skills { get; set; } = [];
    public List<ExperienceDto> Experiences { get; set; } = [];
    public List<EducationDto> Educations { get; set; } = [];
}