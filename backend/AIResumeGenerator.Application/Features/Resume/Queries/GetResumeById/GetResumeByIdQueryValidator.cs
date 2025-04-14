using FluentValidation;

namespace AIResumeGenerator.Application.Features.Resume.Queries.GetResumeById;

public class GetResumeByIdQueryValidator : AbstractValidator<GetResumeByIdQuery>
{
    public GetResumeByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Resume ID is required.")
            .NotEqual(Guid.Empty).WithMessage("Resume ID cannot be empty GUID.");
    }
    
}