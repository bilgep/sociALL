using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<List<SocialEvent>> // We're returning List of SocialEvent
        {

        }

        public class Handler : IRequestHandler<Query, List<SocialEvent>> // We pass Query and return type is List<SocialEvent>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<SocialEvent>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Events.ToListAsync();
            }
        }
    }
}