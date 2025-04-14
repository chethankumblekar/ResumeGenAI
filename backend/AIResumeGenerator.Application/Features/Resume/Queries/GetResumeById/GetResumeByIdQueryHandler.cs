using AIResumeGenerator.Application.Common.Interfaces;
using AIResumeGenerator.Application.DTOs;
using MediatR;

namespace AIResumeGenerator.Application.Features.Resume.Queries.GetResumeById;

public class GetResumeByIdQueryHandler : IRequestHandler<GetResumeByIdQuery,ResumeDto>
{
    private readonly IResumeRepository _repository;

    public GetResumeByIdQueryHandler(IResumeRepository repository)
    {
        _repository = repository;
    }

    public async Task<ResumeDto> Handle(GetResumeByIdQuery request, CancellationToken cancellationToken)
    {
        var resume = await _repository.GetResumeByIdAsync(request.Id);

        if (resume == null)
            throw new KeyNotFoundException($"Resume with ID {request.Id} not found.");

        return resume;
    }
}