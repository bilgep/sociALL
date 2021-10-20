using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // _context.Events.Remove(request.Event);
                // await _context.SaveChangesAsync();
                // return Unit.Value;

                var eventToDelete = await _context.Events.FindAsync(request.Id);
                if(eventToDelete != null)
                {
                    _context.Events.Remove(eventToDelete);
                    await _context.SaveChangesAsync();
                } 
                return Unit.Value;
            }
        }
    }
}