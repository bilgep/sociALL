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
        public async Task<IActionResult> GetEvents()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(Guid id)
        {
            var result = await Mediator.Send(new Details.Query(){Id = id});
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<ActionResult> CreateEvent(SocialEvent evnt)
        {
            return HandleResult(await Mediator.Send(new Create.Command(){ Event = evnt}));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEvent(SocialEvent evnt)
        {
            return HandleResult(await Mediator.Send(new Edit.Command(){Event = evnt }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command(){ Id = id}));
        }

    }
}