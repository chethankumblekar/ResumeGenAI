using AIResumeGenerator.Application.Common.Interfaces;
using AIResumeGenerator.Application.DTOs;
using AIResumeGenerator.Application.Features.Resume.Queries.GetResumeById;
using Moq;

namespace AIResumeGenerator.Application.Tests.Features.Resume.Queries.GetResumeById;

public class GetResumeByIdQueryHandlerTests
{
    private readonly Mock<IResumeRepository> _resumeRepositoryMock;
    private readonly GetResumeByIdQueryHandler _handler;

    public GetResumeByIdQueryHandlerTests()
    {
        _resumeRepositoryMock = new Mock<IResumeRepository>();
        _handler = new GetResumeByIdQueryHandler(_resumeRepositoryMock.Object);
    }

    [Fact]
    public async Task Handle_ReturnsResumeDto_WhenResumeExists()
    {
        // Arrange
        var resumeId = Guid.NewGuid();
        var resumeDto = new ResumeDto
        {
            Id = resumeId,
            FullName = "Chethan Kumblekar",
            Email = "chethan@example.com",
            Phone = "1234567890",
            Summary = "Experienced Software Engineer",
            Experiences = [],
            Educations = [],
            Skills = []
        };

        _resumeRepositoryMock
            .Setup(repo => repo.GetResumeByIdAsync(resumeId))
            .ReturnsAsync(resumeDto);

        var query = new GetResumeByIdQuery(resumeId);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(resumeId, result.Id);
        Assert.Equal("Chethan Kumblekar", result.FullName);
    }

    [Fact]
    public async Task Handle_ReturnsNull_WhenResumeNotFound()
    {
        // Arrange
        var resumeId = Guid.NewGuid();

        _resumeRepositoryMock
            .Setup(repo => repo.GetResumeByIdAsync(resumeId))
            .ReturnsAsync((ResumeDto?)null);

        var query = new GetResumeByIdQuery(resumeId);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Null(result);
    }
    
}