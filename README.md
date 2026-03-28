# NutriTrack Junior

NutriTrack Junior is a Next.js + Supabase web app that generates personalized daily meal plans for children aged 2-12 years with budget and nutrition awareness.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)

## Run Locally

1. Install dependencies:
   - `npm install`
2. Create local env file:
   - Copy `.env.example` to `.env.local`
3. Start app:
   - `npm run dev`

The app works without Supabase keys using a local fallback dataset.

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run SQL from `supabase/schema_and_seed.sql`.
4. Add environment variables to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## API

- `POST /api/generate-plan`
- Body:
  ```json
  {
    "age": 7,
    "weight": 20,
    "dietType": "veg",
    "budget": 200,
    "goal": "balanced",
    "regenerateToken": 1
  }
  ```

## Logic Overview

- Age groups:
  - 2-5: toddler
  - 6-12: child
- Weight class:
  - expectedWeight = age * 2 + 8
  - Underweight: `< expected - 2`
  - Overweight: `> expected + 5`
  - Else normal
- Meal generation:
  - Filters by diet + age
  - Applies restrictions for toddler and overweight
  - Splits budget by meal (25/35/15/25)
  - Picks 2-3 items per meal
  - Enforces protein presence
- Scoring:
  - +3 protein
  - +3 iron
  - +2 calcium
  - +2 diversity
