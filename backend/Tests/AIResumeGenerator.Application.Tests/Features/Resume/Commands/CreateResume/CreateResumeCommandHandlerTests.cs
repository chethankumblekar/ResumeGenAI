using AIResumeGenerator.Application.Common.Interfaces;
using AIResumeGenerator.Application.Features.Resume.Commands.CreateResume;
using MediatR;
using Moq;

namespace AIResumeGenerator.Application.Tests.Features.Resume.Commands.CreateResume;

public class CreateResumeCommandHandlerTests
{
    private readonly Mock<IResumeRepository> _resumeRepositoryMock;
    private readonly CreateResumeCommandHandler _handler;

    public CreateResumeCommandHandlerTests()
    {
        _resumeRepositoryMock = new Mock<IResumeRepository>();
        _handler = new CreateResumeCommandHandler(_resumeRepositoryMock.Object);
    }
    
    [Fact]
    public async Task Handle_ShouldReturnGuid_WhenResumeCreatedSuccessfully()
    {
        // Arrange
        var expectedId = Guid.NewGuid();
        var command = new CreateResumeCommand(
            FullName: "Chethan K",
            Email: "chethan@example.com",
            Phone: "1234567890",
            Summary: "Backend developer with .NET expertise",
            Skills:
            [
                new SkillDto("C#"),
                new SkillDto(".NET 8")
            ],
            Experiences: [
                new ExperienceDto(
                    "OpenAI", 
                    "Software Engineer", 
                    "2 Years", 
                    "Worked on AI projects"
                    )],
            Educations: [
                new EducationDto(
                    "MIT", 
                    "BTech", 
                    "2022", 
                    "Computer Science"
                    )]
        );

        _resumeRepositoryMock
            .Setup(repo => repo.CreateResumeAsync(command))
            .ReturnsAsync(expectedId);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        Assert.Equal(expectedId, result);
        _resumeRepositoryMock.Verify(r => r.CreateResumeAsync(command), Times.Once);
    }

}