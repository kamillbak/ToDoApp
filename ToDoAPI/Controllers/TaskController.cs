using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ToDoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DataContext _context;
        public TaskController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Task>>> Get()
        {
            return Ok(await _context.Tasks.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> Get(int id)
        {
            var task = _context.Tasks.FindAsync(id);
            if (task == null)
                return BadRequest("Task not found.");
            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<List<Task>>> AddTask(Task t)
        {
            _context.Tasks.Add(t);
            await _context.SaveChangesAsync();

            return Ok(await _context.Tasks.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Task>>> UpdateTask(Task taskToUpdate)
        {
            var DBtask = await _context.Tasks.FindAsync(taskToUpdate.Id);
            if (DBtask == null)
                return BadRequest("Task not found.");

            DBtask.Name = taskToUpdate.Name;
            DBtask.Priority = taskToUpdate.Priority;
            DBtask.Description = taskToUpdate.Description;

            await _context.SaveChangesAsync();

            return Ok(await _context.Tasks.ToListAsync());
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Task>>> Delete(int id)
        {
            var DBtask = await _context.Tasks.FindAsync(id);
            if (DBtask == null)
                return BadRequest("Task not found.");

            _context.Tasks.Remove(DBtask);

            await _context.SaveChangesAsync();

            return Ok(await _context.Tasks.ToListAsync());
        }

    }
}

