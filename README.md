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