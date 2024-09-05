using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var tasks = await _context.Tasks.Where(t => t.UserId.ToString() == userId).ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var task = await _context.Tasks.SingleOrDefaultAsync(t => t.Id == id && t.UserId.ToString() == userId);

            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskItem taskItem)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            taskItem.UserId = Guid.Parse(userId!);
            _context.Tasks.Add(taskItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = taskItem.Id }, taskItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, TaskItem updatedTask)
        {
            if (id != updatedTask.Id)
                return BadRequest();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var task = await _context.Tasks.SingleOrDefaultAsync(t => t.Id == id && t.UserId.ToString() == userId);

            if (task == null)
                return NotFound();

            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.DueDate = updatedTask.DueDate;
            task.Status = updatedTask.Status;
            task.Priority = updatedTask.Priority;
            task.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var task = await _context.Tasks.SingleOrDefaultAsync(t => t.Id == id && t.UserId.ToString() == userId);

            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
