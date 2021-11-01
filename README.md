# sociALL
A social media application with events and chat features
## Software Architecture
- Clean Architecture (n-tier);
  - Domain layer for entities - It has no dependencies
  - Persistence layer for the DB - Accesses to the Domain layer entities
  - Application layer for business logic operations - Accesses to the Persistence layer and Domain layer
  - API layer for request/response handling - Accesses to the Application layer
## Project Steps
### Creating Walking Skeleton - Part 1: The API Side
- Creating solution and projects
- Creating first entity
- Setting up Entity Framwork Core and triggering the migration - code first approach
- Creating database and seeding data
- Adding first API Controller
### Creating Walking Skeleton - Part 2: The Client Side
- Creating the React with TypeScript client app 
- Fetching data from API with Axios after setting CORS policy
- Adding the styling framework (Semantic UI)
### Creating CRUD Application: The API Side 
- Implementing CQRS principles (Command & Query Responsibility Segregation) with Mediator pattern (by MediatR Dependency Injection NuGet package) on Application layer
- Creating Create, Edit, Delete, List features in Application layer + using AutoMapper extension for ASP.NET Core
- Modifying the Startup class with extension methods
### Creating CRUD Application: The Client Side 
- Arranging the folder structure of client application 
    + src
      + app
        + layout (css, tsx files)
        + modules (ts files)
      + features 
        + events
          + dashboard 
          + details
          + form
- Creating TypeScript interface from JSON response of the API endpoint (by using an online JSON to TypeScript converter)
- Defining newly created specific TypeScript types (like SocialEvent) in client application operations
- Adding a navigation bar (Semantic-UI)
- Adding Event Dashboard feature (structuring with Semantic UI Grid) by passing events from App.tsx to Event Dashboard feature
- Creating an Event List (a child component of event dashboard) and adding into Event Dashboard feature by passing events from Dashboard to the EventList
- Creating an Event Form component for editing or creating an event
- Passing the selected event (if exists) across the related components
- Implementing the editMode functionality 
- Installing "uuid" (npm install uuid) package in client app for Guid usage
- Handling the form submission
- Adding Delete Event functionality into the EventList feature
### Axios Implementation
- Creating a centralized Axios operations structure 
- Using generic types
- Connecting client app requests (CRUD) with API

