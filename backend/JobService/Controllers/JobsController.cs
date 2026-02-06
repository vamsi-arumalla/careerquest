using Microsoft.AspNetCore.Mvc;
using JobService.Models;
using System.Collections.Generic;
using System.Linq;

namespace JobService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly JobService.Data.IJobRepository _repository;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public JobsController(JobService.Data.IJobRepository repository, IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _repository = repository;
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
        {
            var jobs = await _repository.GetAllJobsAsync();
            return Ok(jobs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJob(int id)
        {
            var job = await _repository.GetJobByIdAsync(id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        [HttpPost]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Employer,Admin")]
        public async Task<ActionResult<Job>> PostJob(Job job)
        {
            await _repository.CreateJobAsync(job);

            // Index in Search Service
            try
            {
                var client = _httpClientFactory.CreateClient();
                // Use the service name from docker-compose if running in docker, or localhost if running locally with ports
                // For simplicity assuming localhost ports or configured via appsettings
                var searchServiceUrl = _configuration["SearchService:Url"] ?? "http://localhost:5004"; 
                await client.PostAsJsonAsync($"{searchServiceUrl}/api/search/index", job);
            }
            catch (Exception ex)
            {
                // Log error but don't fail the request
                Console.WriteLine($"Failed to index job: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetJob), new { id = job.Id }, job);
        }

        [HttpPut("{id}")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Employer,Admin")]
        public async Task<IActionResult> PutJob(int id, Job job)
        {
            if (id != job.Id)
            {
                return BadRequest();
            }

            try 
            {
                await _repository.UpdateJobAsync(job);
            }
            catch
            {
               if (await _repository.GetJobByIdAsync(id) == null)
                   return NotFound();
               throw;
            }

            return NoContent();
        }
        
        [HttpDelete("{id}")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Employer,Admin")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var job = await _repository.GetJobByIdAsync(id);
            if (job == null)
            {
                return NotFound();
            }
            
            await _repository.DeleteJobAsync(id);
            return NoContent();
        }
    }
}
