# AI Job Application Tracker

An AI-powered job application tracker that helps you manage your job search and get instant resume feedback.

## Features

- JWT Authentication (signup/signin)
- Track job applications with status updates
- AI-powered resume review with ATS scoring
- Structured feedback — strengths, improvements, suggestions
- Clean dashboard to manage all applications

## Tech Stack

**Backend**
- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- JWT + bcrypt for auth
- Zod for validation
- Groq AI (llama-3.3-70b) for resume analysis
- Multer for file uploads

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

## Getting Started

### Backend
```bash
cd job-tracker
npm install
cp .env.example .env
# fill in your .env values
npx prisma migrate dev
npx ts-node src/index.ts
```

### Frontend
```bash
cd job-tracker-fe
npm install
npm run dev
```

## API Endpoints

### Auth
- `POST /api/v1/auth/signUp`
- `POST /api/v1/auth/signIn`

### Applications
- `GET /api/v1/applications`
- `POST /api/v1/applications`
- `GET /api/v1/applications/:id`
- `PUT /api/v1/applications/:id`
- `DELETE /api/v1/applications/:id`

### Documents
- `POST /api/v1/documents/upload`

## Environment Variables
```env
DATABASE_URL=
JWT_SECRET=
GROQ_API_KEY=
PORT=
```

## Roadmap

- [ ] Cover letter generator
- [ ] Job description matcher
- [ ] Payment integration (Razorpay)
- [ ] Email notifications
- [ ] Application analytics dashboard
