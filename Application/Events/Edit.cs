using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Edit
    {
        public class Command : IRequest
        {
            public SocialEvent Event { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // _context.Events.Update(request.Event);
                // await _context.SaveChangesAsync();
                // return Unit.Value;

                var eventToEdit = await _context.Events.FindAsync(request.Event.Id);
                _mapper.Map(request.Event, eventToEdit); // We're mapping the requested updated event to the existing event came from the Persistence layer (db)
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}