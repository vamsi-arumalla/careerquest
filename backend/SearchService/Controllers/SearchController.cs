using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace SearchService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly SearchService.Data.ISearchRepository _repository;

        public SearchController(SearchService.Data.ISearchRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SearchService.Models.Job>>> Search([FromQuery] string q)
        {
            var results = await _repository.SearchJobsAsync(q);
            return Ok(results);
        }

        [HttpPost("index")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Employer,Admin")]
        public async Task<IActionResult> IndexJob([FromBody] SearchService.Models.Job job)
        {
            var result = await _repository.IndexJobAsync(job);
            if (!result)
            {
                return StatusCode(500, "Failed to index job");
            }
            return Ok();
        }
    }
}
