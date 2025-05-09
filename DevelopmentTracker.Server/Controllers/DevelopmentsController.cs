using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DevelopmentTracker.Server.Database;
using DevelopmentTracker.Server.Model;

namespace DevelopmentTracker.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevelopmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DevelopmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Developments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Developments>>> GetDevelopments()
        {
            return await _context.Developments.ToListAsync();
        }

        // GET: api/Developments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Developments>> GetDevelopments(int id)
        {
            var developments = await _context.Developments.FindAsync(id);

            if (developments == null)
            {
                return NotFound();
            }

            return developments;
        }

        // PUT: api/Developments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDevelopments(int id, Developments developments)
        {
            if (id != developments.Id)
            {
                return BadRequest();
            }

            _context.Entry(developments).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DevelopmentsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Developments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Developments>> PostDevelopments(Developments developments)
        {
            _context.Developments.Add(developments);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDevelopments", new { id = developments.Id }, developments);
        }

        // DELETE: api/Developments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevelopments(int id)
        {
            var developments = await _context.Developments.FindAsync(id);
            if (developments == null)
            {
                return NotFound();
            }

            _context.Developments.Remove(developments);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DevelopmentsExists(int id)
        {
            return _context.Developments.Any(e => e.Id == id);
        }
    }
}
