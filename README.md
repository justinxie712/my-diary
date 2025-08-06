# My Diary App

A full-stack personal diary application built as my first CRUD application, featuring user authentication and diary entry management.

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for development and build tooling
- **React Router DOM** for client-side routing
- **Reactstrap** and **Bootstrap 5** for UI components and styling
- **React Icons** for iconography
- **React Toastify** for notifications
- **Sass** for enhanced CSS

### Backend
- **Node.js** with **Express 5**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment configuration

### Development Tools
- **Concurrently** for running client and server simultaneously
- **Nodemon** for server auto-restart
- **ESLint** and **TypeScript** for code quality

## App Functionality

### Core Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Diary Management**: Full CRUD operations for diary entries
- **Protected Routes**: Authentication-based access control
- **Responsive Design**: Mobile-friendly interface with Bootstrap

### User Flow
1. Users register with username and password
2. Login redirects to protected diary dashboard
3. Create, read, update, and delete personal diary entries
4. Each entry includes title, content, and automatic timestamps
5. Entries are user-specific through MongoDB relationships

## Critical Learnings

### Full-Stack Architecture
- **Separation of Concerns**: Learned to structure client and server as independent applications
- **API Design**: Implemented RESTful endpoints with proper HTTP methods and status codes
- **Authentication Flow**: Understanding JWT token-based authentication from frontend to backend

### Database Design
- **MongoDB Relationships**: Implemented user-entry relationships using ObjectId references
- **Schema Design**: Created flexible schemas for users and diary entries
- **Data Validation**: Used Mongoose for schema validation and middleware

### Frontend Development
- **State Management**: Managed authentication state across components using React Context
- **Protected Routing**: Implemented conditional routing based on authentication status
- **Component Architecture**: Built reusable components with TypeScript for type safety

### Security Best Practices
- **Password Hashing**: Implemented bcrypt for secure password storage
- **Environment Variables**: Learned to protect sensitive data like database URIs
- **CORS Configuration**: Handled cross-origin requests between client and server

### Development Workflow
- **Concurrent Development**: Set up scripts to run client and server simultaneously
- **Hot Reloading**: Configured development environment for rapid iteration
- **Project Structure**: Organized code into logical directories and modules

This project provided hands-on experience with the complete web development stack, from database design to user interface, teaching fundamental concepts that form the foundation for more complex applications.
