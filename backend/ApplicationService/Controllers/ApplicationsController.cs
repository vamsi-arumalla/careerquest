using Microsoft.AspNetCore.Mvc;
using ApplicationService.Models;
using System.Collections.Generic;
using System.Linq;

namespace ApplicationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class ApplicationsController : ControllerBase
    {
        private readonly ApplicationService.Data.IApplicationRepository _repository;

        public ApplicationsController(ApplicationService.Data.IApplicationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Application>>> GetUserApplications(int userId)
        {
            var applications = await _repository.GetApplicationsByUserIdAsync(userId);
            return Ok(applications);
        }

        [HttpPost]
        public async Task<ActionResult<Application>> SubmitApplication(Application application)
        {
            var createdApplication = await _repository.CreateApplicationAsync(application);
            return Ok(createdApplication);
        }
    }
}
