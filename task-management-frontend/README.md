# Task Management System

## Overview

This is a task management system built using ASP.NET Core for the backend and React.js with Ant Design for the frontend. The system allows users to register, log in, and manage tasks with various statuses and priorities.

## Features

- User authentication using JWT (JSON Web Tokens).
- CRUD operations for tasks.
- Task statuses: Pending, In Progress, Completed.
- Task priorities: Low, Medium, High.
- Tasks are associated with users, and each user can only access their own tasks.

## Technologies

- **Backend:** ASP.NET Core, Entity Framework Core, MySQL, JWT for authentication.
- **Frontend:** React.js, Ant Design for UI components, Axios for HTTP requests.

## Setup

### Backend

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TaskManagementAPI
   
2. Set up the MySQL database and update the connection string in appsettings.json.

3. Apply migrations to set up the database:
  ![alt text](image-1.png)
  dotnet ef database update</code>
  
4. Run the API: ![alt text](image.png)

### Frontend
1. Navigate to the frontend directory:
![alt text](image-2.png)

2. Install dependencies:
![alt text](image-3.png)

3. Run the frontend:
![alt text](image-4.png)

4. The frontend will be available at http://localhost:3000.


### API Endpoints
  POST /api/users/register:   Register a new user.
  POST /api/users/login:      Authenticate a user and retrieve a JWT.
  GET /api/tasks:             Retrieve all tasks for the authenticated user.
  POST /api/tasks:            Create a new task.
  PUT /api/tasks/{id}:        Update a task by ID.
  DELETE /api/tasks/{id}:     Delete a task by ID.