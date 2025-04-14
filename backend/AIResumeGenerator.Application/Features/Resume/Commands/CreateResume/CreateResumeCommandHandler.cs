using AIResumeGenerator.Application.Common.Interfaces;
using MediatR;

namespace AIResumeGenerator.Application.Features.Resume.Commands.CreateResume;

public class CreateResumeCommandHandler(IResumeRepository resumeRepository) : IRequestHandler<CreateResumeCommand, Guid>
{
    public async Task<Guid> Handle(CreateResumeCommand command, CancellationToken cancellationToken)
    {
        return await resumeRepository.CreateResumeAsync(command);
    }
    
}