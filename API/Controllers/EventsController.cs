using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using Application.Events;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<SocialEvent>>> GetEvents()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SocialEvent>> GetEvent(Guid id)
        {
            return await Mediator.Send(new Details.Query(){Id = id});
        }

        [HttpPost]
        public async Task<ActionResult> CreateEvent(SocialEvent evnt)
        {
            var result = await Mediator.Send(new Create.Command(){ Event = evnt});
            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEvent(SocialEvent evnt)
        {
            var result =  await Mediator.Send(new Edit.Command(){Event = evnt });
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command(){ Id = id});
            return Ok(result);
        }

    }
}