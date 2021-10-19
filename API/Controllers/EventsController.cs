using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        private readonly DataContext _context;
        public EventsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<SocialEvent>>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }
        
        [HttpGet("id")]
        public async Task<ActionResult<SocialEvent>> GetEvent(Guid id)
        {
            return await _context.Events.FindAsync(id);
        }

    }
}