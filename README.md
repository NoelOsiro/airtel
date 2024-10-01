<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/9113740/201498864-2a900c64-d88f-4ed4-b5cf-770bcb57e1f5.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
</picture>

<div align="center"><strong>Company Admin Dashboard Starter Template With Shadcn-ui</strong></div>
<div align="center">Built by Noel Osiro</div>
<br />
<div align="center">
<a href="https://airtel-pearl.vercel.app">View Demo</a>
<span>
</div>

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

## Getting Started

Follow these steps to clone the repository and start the development server:

- `git clone https://github.com/NoelOsiro/airtel`
- `npm install`
- Create a `.env.local` file by copying the example environment file:
  `cp env.example.txt .env.local`
- Add the required environment variables to the `.env.local` file.
- `npm run dev`

You should now be able to access the application at http://localhost:3000.
