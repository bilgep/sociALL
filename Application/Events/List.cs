using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<Result<List<SocialEvent>>> // We're returning List of SocialEvent
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<SocialEvent>>> // We pass Query and return type is List<SocialEvent>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<SocialEvent>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<SocialEvent>>.Success(await _context.Events.ToListAsync(cancellationToken));
            }
        }
    }
}