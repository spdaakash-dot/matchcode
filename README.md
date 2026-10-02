# MatchCode

"One Material. Many Names. One Standard Identity."

## Project Overview

MatchCode is an AI-powered material standardization and harmonization platform for CPSEs (Central Public Sector Enterprises). It ingests material lists from different organizations, cleans and normalizes the data, extracts important attributes, identifies potential duplicate/equivalent materials using AI-assisted matching, and routes matches to human review for final standardization.

## Features

- **Intelligent Matching Engine**: Simulates semantic similarity and attribute matching across records.
- **Explainable AI**: Provides transparency into confidence scores and why items were matched.
- **Human-in-the-Loop Review**: Dedicated queue for reviewing AI recommendations.
- **Standard Material Master**: A central, pristine registry of normalized materials.
- **Audit Trail**: Logs all system and human interactions.
- **Premium Dark Dashboard**: Professional UI built with Tailwind CSS and Framer Motion.

## Architecture

- **Frontend**: React (Vite), TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Environment Variables

For a real deployment, copy `.env.example` to `.env` and fill in:

- `DATABASE_URL`: Postgres/Supabase connection string
- `AI_API_KEY`: API key for LLM matching engine
- `AUTH_SECRET`: Secret for session tokens

*(Note: The current application runs entirely client-side as an interactive prototype and does not require actual environment variables).*

## Deployment

The application is built using Vite. The production artifacts are generated in the `dist` folder. This folder can be deployed to any static host (Vercel, Netlify, AWS S3, etc.).

For Vercel:
```bash
npx vercel
```
