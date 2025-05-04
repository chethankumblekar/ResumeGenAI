using AIResumeGenerator.Application.Features.Resume.Commands.CreateResume;
using AIResumeGenerator.Application.Features.Resume.Queries.GetResumeById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AIResumeGenerator.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController(IMediator mediator) : ControllerBase
    {
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody]CreateResumeCommand command)
        {
            var resumeId = await mediator.Send(command);
            return CreatedAtAction(nameof(GetResumeById), new { id = resumeId }, new { resumeId });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetResumeById(Guid id)
        {
            var query = new GetResumeByIdQuery(id);
            var result = await mediator.Send(query);

            return Ok(result);
        }
    }
}