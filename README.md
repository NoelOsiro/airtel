![image](https://github.com/user-attachments/assets/94c0ff5f-4e29-4d71-9b1c-97578213ce34)



<h1 align="center"><strong>Company Admin Dashboard With Shadcn-ui</strong></h1>
<div align="center">Built by Noel Osiro</div>
<br />
<div align="center">
<a href="https://airtel-pearl.vercel.app">View Demo</a>
<span>
</div>
  
![image](https://github.com/user-attachments/assets/c3b28790-197f-4457-ac03-3fa9c1d869ee)
  
## Overview

This is a starter template using the following stack:

- Framework - [Next.js 14](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Auth - [Auth.js](https://authjs.dev/)
- File Uploading - [Uploadthing](https://uploadthing.com)
- Tables - [Tanstack Tables](https://ui.shadcn.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Linting - [ESLint](https://eslint.org)
- Pre-commit Hooks - [Husky](https://typicode.github.io/husky/)
- Formatting - [Prettier](https://prettier.io)

## Pages

| Pages                                                                   | Specifications                                                                                        |
| :---------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| [Signup](https://airtel-pearl.vercel.app/)                              | Authentication with **NextAuth** supports Social logins and email logins(Enter dummy email for demo). |
| [Dashboard](https://airtel-pearl.vercel.app/dashboard)                  | Cards with recharts graphs for analytics.                                                             |
| [Customers](https://airtel-pearl.vercel.app/dashboard/customer)         | Tanstack tables with customer details client side searching, pagination etc                           |
| [Customers/new](https://airtel-pearl.vercel.app/dashboard/customer/new) | A User Form with Uploadthing to support file uploading with dropzone.                                 |
| [Employee](https://airtel-pearl.vercel.app/dashboard/employee)          | Tanstack tables with server side searching, pagination etc).                                          |
| [Profile](https://airtel-pearl.vercel.app/dashboard/profile)            | Mutistep dynamic forms using react-hook-form and zod for form validation.                             |
| [Kanban Board](https://airtel-pearl.vercel.app/dashboard/kanban)        | A Drag n Drop task management board with dnd-kit and zustand to persist state locally.                |
| [Not Found](https://airtel-pearl.vercel.app/dashboard/notfound)         | Not Found Page Added in the root level                                                                |
| -                                                                       | -                                                                                                     |

## Architecture

This application utilizes Supabase as a backend-as-a-Service (BaaS) solution, providing a powerful and scalable backend for various features. Supabase offers authentication, storage, database, and real-time capabilities, streamlining development and simplifying backend management.

Key Components and Interactions:

### Frontend (Next.js)

Handles user interface rendering and interactions.
Makes API calls to Supabase for authentication, data retrieval, and updates.
Uses Shadcn-ui for components, Zustand for state management, and other libraries as mentioned in the Overview.
Supabase:

#### Authentication

Provides authentication mechanisms like email/password, social logins, and more.

#### Storage

Offers storage for files and media, integrated with Uploadthing for easy file handling.

#### Database

Manages data using a PostgreSQL database with a robust schema.

#### Real-time

Enables real-time updates and communication between the frontend and backend.

#### API Routes

Defined in app/api directory.
Handle API requests from the frontend.
Interact with Supabase to perform authentication, data operations, and other backend logic.
Data Flow and Interactions:
User Authentication:

#### Frontend makes authentication requests to Supabase API

Supabase handles authentication and returns tokens.
Frontend stores tokens for subsequent requests.
Data Retrieval:

#### Frontend makes API requests to fetch data from Supabase

API routes query the Supabase database and return data.
Frontend renders data using components and state management.
Data Updates:

#### Frontend sends updated data to Supabase API

API routes validate and update the data in the Supabase database.
Frontend updates its state based on the response.
Real-time Updates:

#### Supabase provides real-time subscriptions for data changes

Frontend can subscribe to relevant data and receive updates in real-time.
API Endpoints:
Authentication:
/api/auth/signin
/api/auth/signup
/api/auth/signout
/api/auth/session
Data Operations:
/api/customers (CRUD operations for customers)
/api/employees (CRUD operations for employees)
/api/profile (Update user profile)
/api/kanban (Kanban board operations)
// Add more endpoints as needed



## Getting Started

Follow these steps to clone the repository and start the development server:

- `git clone https://github.com/NoelOsiro/airtel`
- `npm install`
- Create a `.env.local` file by copying the example environment file:
  `cp env.example.txt .env.local`
- Add the required environment variables to the `.env.local` file.
- `npm run dev`

You should now be able to access the application at <http://localhost:3000>.
