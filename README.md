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
     ```bash
     dotnet ef migrations add InitialCreate
     dotnet ef database update
  4. Run the API:
      ```bash
      dotnet run
### Frontend
  1. Navigate to the frontend directory:
      ```bash
      cd task-management-frontend
      
  2. Install dependencies:  
      ```bash
      npm install
      
  3. Run the frontend:  
      ```bash
      npm start
      
  4. The frontend will be available at http://localhost:3000.
### API Endpoints
  POST /api/users/register: Register a new user.

