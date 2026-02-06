using System;

namespace ApplicationService.Models
{
    public class Application
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; } = "Applied"; // Applied, Interviewing, Rejected, Hired
        public DateTime AppliedDate { get; set; } = DateTime.UtcNow;
    }
}
