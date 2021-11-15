using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;
using static Application.Events.Details;

namespace Application.Events
{
    public class Details
    {
        public class Query : IRequest<Result<SocialEvent>>
        {
            public Guid Id { get; set; }
        }
    }

    public class Handler : IRequestHandler<Query, Result<SocialEvent>>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<SocialEvent>> Handle(Query request, CancellationToken cancellationToken)
        {
            var socialEvent =  await _context.Events.FindAsync(request.Id);
            return Result<SocialEvent>.Success(socialEvent);
            
        }
    }

}