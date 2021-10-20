using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using static Application.Events.Details;

namespace Application.Events
{
    public class Details
    {
        public class Query : IRequest<SocialEvent>
        {
            public Guid Id { get; set; }
        }
    }

    public class Handler : IRequestHandler<Query, SocialEvent>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<SocialEvent> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Events.FindAsync(request.Id);
        }
    }

}