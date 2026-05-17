# AI Candidate Shortlisting System

A full-stack application that helps recruiters manage candidates and automatically shortlists them using AI (OpenRouter API) based on job requirements.

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Recharts, Lucide React, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **AI Integration:** OpenRouter API (`openai/gpt-5.2` model specified)

## Project Features
1. **Candidate Management:** Add and view candidates with their skills and experience.
2. **Job Requirement Matching:** Define required skills, preferred skills, and minimum experience.
3. **Basic Match Logic:** Calculates a base match score and filters candidates.
4. **AI Shortlisting:** Sends candidates to OpenRouter AI for deeper analysis, providing an adjusted score, detailed recommendations, and suggested interview questions.
5. **Analytics & Visualization:** Charts the top candidates for quick assessment.

## Folder Structure Explanation

```
ai-shortlisting-system/
│
├── backend/                  # Node.js + Express Backend
│   ├── config/               # Database connection logic
│   ├── controllers/          # API route handlers (business logic)
│   ├── models/               # Mongoose schemas (Candidate)
│   ├── routes/               # Express route definitions
│   ├── services/             # External service integrations (AI OpenRouter)
│   ├── utils/                # Helper functions (Basic Match Logic)
│   ├── server.js             # Entry point of the backend app
│   └── seed.js               # Script to populate dummy database data
│
└── frontend/                 # React Frontend (Vite)
    ├── src/
    │   ├── api/              # Axios service to communicate with Backend
    │   ├── components/       # Reusable UI components (Navbar, CandidateCard)
    │   ├── pages/            # View pages (Forms, Lists, Results)
    │   ├── App.jsx           # Main React component & Routing
    │   └── main.jsx          # React DOM render entry
    └── tailwind.config.js    # Styling config (handled by @tailwindcss/vite in Vite config)
```

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas connection string
- OpenRouter API Key

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (you can copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your actual `MONGO_URI` and `OPENROUTER_API_KEY`.
5. Seed dummy data (optional but recommended):
   ```bash
   node seed.js
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
   (Server will run on http://localhost:5000)

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the link provided by Vite in your browser (usually http://localhost:5173).

## API Documentation

### Candidates
- **POST /api/candidates** - Create a new candidate. 
  - Body: `{ name, email, skills, experience, bio }`
- **GET /api/candidates** - Retrieve all candidates.

### Matching & Shortlisting
- **POST /api/match** - Basic match logic without AI.
  - Body: `{ requiredSkills: [], preferredSkills: [], minExperience: number }`
- **POST /api/ai/shortlist** - Match candidates and analyze with AI.
  - Body: `{ requiredSkills: [], preferredSkills: [], minExperience: number }`

## Database Schema (MongoDB/Mongoose)
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: [String], required: true },
  experience: { type: Number, required: true }, // In years
  bio: { type: String, required: true },
  timestamps: true // adds createdAt, updatedAt
}
```
