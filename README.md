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
- Setting up Entity Framwwork Core and triggering a migration by code first approach
- Creating database and seeding data
- Adding first API Controller
### Creating Walking Skeleton - Part 2: The Client Side
- ...
