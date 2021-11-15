using Domain;
using FluentValidation;

namespace Application.Events
{
    public class EventValidator : AbstractValidator<SocialEvent>
    {
        public EventValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
            
        }
    }
}