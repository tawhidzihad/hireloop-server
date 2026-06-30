# HireLoop Server

HireLoop Server is the backend REST API for the HireLoop Job Portal Platform. It provides APIs for managing jobs, companies, applications, subscriptions, pricing plans, and user-related operations. Built with **Node.js**, **Express.js**, and **MongoDB**, the server is designed to power a modern recruitment platform with role-based authorization.

---

# 🌐 Live API

https://hireloop-server-chi.vercel.app/

---

# 🌐 Live Client

https://hireloop-client-livid.vercel.app/

---

# 🔗 GitHub Repositories

### Client Repository

https://github.com/tawhidzihad/hireloop-client

### Server Repository

https://github.com/tawhidzihad/hireloop-server

---

# 🚀 Features

- RESTful API Architecture
- MongoDB Native Driver
- Express.js Server
- Company Registration Management
- Job Posting APIs
- Job Application APIs
- Pricing Plan APIs
- Subscription Management
- Role-based Authorization
- Recruiter APIs
- Admin APIs
- Search & Filtering
- Pagination Support
- CORS Enabled
- Environment Variable Support

---

# 🛠 Technologies

- Node.js
- Express.js
- MongoDB
- dotenv
- CORS

---

# 📁 Project Structure

```text
hireloop-server
│
├── index.js
├── package.json
├── .env
│
└── MongoDB Collections
    ├── jobs
    ├── companies
    ├── applications
    ├── plans
    ├── subscriptions
    ├── user
    └── session
```

---

# 🔐 Authorization

The server uses **Better Auth Sessions** for authentication.

Protected routes are secured using custom middleware.

### Available Middleware

- verifyToken
- verifySeeker
- verifyRecruiter
- verifyAdmin

These middleware functions protect APIs based on user roles.

---

# 📡 API Endpoints

## Jobs

| Method | Endpoint        | Description                              |
| ------ | --------------- | ---------------------------------------- |
| GET    | `/api/jobs`     | Get all jobs with filtering & pagination |
| GET    | `/api/jobs/:id` | Get single job                           |
| POST   | `/api/jobs`     | Create a new job                         |

### Supported Job Filters

```
search
jobType
jobCategory
companyId
status
isRemote
page
perPage
```

Example

```
GET /api/jobs?search=react&page=1&perPage=6
```

---

## Applications

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/applications` | Get applications for a seeker |
| POST   | `/api/applications` | Submit a new application      |

Supported Query

```
applicantId
jobId
```

---

## Companies

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| GET    | `/api/my/companies`  | Recruiter's company           |
| GET    | `/api/companies`     | Admin gets all companies      |
| POST   | `/api/companies`     | Recruiter registers a company |
| PATCH  | `/api/companies/:id` | Admin updates company status  |

---

## Plans

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/api/plans` | Get pricing plan |

Supported Query

```
planId
```

---

## Subscriptions

| Method | Endpoint             | Description                          |
| ------ | -------------------- | ------------------------------------ |
| POST   | `/api/subscriptions` | Save subscription & update user plan |

---

# 🗂 Database Collections

The project uses the following MongoDB collections.

```
jobs
companies
applications
plans
subscriptions
user
session
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8000

MONGO_DB_URI=
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/tawhidzihad/hireloop-server.git
```

Navigate to the project

```bash
cd hireloop-server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=8000
MONGO_DB_URI=
```

Run development server

```bash
npm run server
```

Run production server

```bash
npm start
```

---

# 📜 Available Scripts

Development

```bash
npm run server
```

Production

```bash
npm start
```

---

# 📦 Dependencies

- express
- mongodb
- dotenv
- cors

---

# 🔮 Future Improvements

- Request Validation
- Centralized Error Handling
- JWT Support
- API Rate Limiting
- Swagger Documentation
- Logging System
- Unit Testing
- File Upload API
- Recruiter Analytics API

---

## HTTP Status Codes

- 200 - Success
- 201 - Resource Created
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Internal Server Error

---

# 👨‍💻 Developer

**Tawhid Zihad**

MERN Stack Developer

GitHub: https://github.com/tawhidzihad

---

## ⭐ Support

If you like this project, consider giving the repository a **star ⭐**.
