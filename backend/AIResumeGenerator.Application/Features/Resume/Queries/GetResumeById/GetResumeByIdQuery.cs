using AIResumeGenerator.Application.DTOs;
using MediatR;

namespace AIResumeGenerator.Application.Features.Resume.Queries.GetResumeById;

public class GetResumeByIdQuery(Guid id) : IRequest<ResumeDto>
{
    public Guid Id { get; set; } = id;
}