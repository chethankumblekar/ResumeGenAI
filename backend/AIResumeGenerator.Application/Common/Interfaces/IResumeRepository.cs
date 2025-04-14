using AIResumeGenerator.Application.DTOs;
using AIResumeGenerator.Application.Features.Resume.Commands.CreateResume;

namespace AIResumeGenerator.Application.Common.Interfaces;

public interface IResumeRepository
{
    Task<Guid> CreateResumeAsync(CreateResumeCommand command);
    Task<ResumeDto?> GetResumeByIdAsync(Guid id);
}