using MediatR;

namespace AIResumeGenerator.Application.Features.Resume.Commands.CreateResume;

public record CreateResumeCommand(
    string FullName,
    string Email,
    string Phone,
    string Summary,
    List<SkillDto> Skills,
    List<ExperienceDto> Experiences,
    List<EducationDto> Educations
) : IRequest<Guid>;

public record SkillDto(string SkillName);

public record ExperienceDto(string Company, string Role, string Duration, string Description);

public record EducationDto(string Institution, string Degree, string Year, string Description);