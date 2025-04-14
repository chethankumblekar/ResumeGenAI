using FluentValidation;

namespace AIResumeGenerator.Application.Features.Resume.Commands.CreateResume;

public class CreateResumeCommandValidator : AbstractValidator<CreateResumeCommand>
{
    public CreateResumeCommandValidator()
    {
        RuleFor(x => x.FullName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Phone).NotEmpty().MinimumLength(10).MaximumLength(15);
        RuleFor(x => x.Summary).NotEmpty();

        RuleForEach(x => x.Skills).ChildRules(skill =>
        {
            skill.RuleFor(s => s.SkillName).NotEmpty();
        });

        RuleForEach(x => x.Experiences).ChildRules(exp =>
        {
            exp.RuleFor(e => e.Company).NotEmpty();
            exp.RuleFor(e => e.Role).NotEmpty();
        });

        RuleForEach(x => x.Educations).ChildRules(edu =>
        {
            edu.RuleFor(e => e.Institution).NotEmpty();
            edu.RuleFor(e => e.Degree).NotEmpty();
        });
    }
}