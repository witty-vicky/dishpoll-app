# DishPoll

DishPoll is a Next.js app where users can log in, rank dishes (Rank 1/2/3), and view a live leaderboard based on points.

## Features

- **Login**: Simple demo login using `src/app/data/users.json`
- **Persistent session**: `currentUser` is stored in `localStorage`
- **Voting**: Rank dishes with **Rank 1 (30 pts)**, **Rank 2 (20 pts)**, **Rank 3 (10 pts)**
- **Results/Leaderboard**: Aggregated points across users with a podium-style layout
- **Modern UI**: TailwindCSS + Radix UI + Lucide icons + Sonner toasts

## Tech Stack

- **Next.js** (App Router)
- **React**
- **TailwindCSS v4**
- **Radix UI** (Tabs, Label)
- **Lucide React** (icons)
- **Sonner** (toast notifications)

## Prerequisites

- Node.js (recommended: latest LTS)
- npm (or your preferred package manager)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open:

- `http://localhost:3000`

## Scripts

- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Start (production)**: `npm run start`
- **Lint**: `npm run lint`

## Demo Login Users

Credentials are stored in:

- `src/app/data/users.json`

Example:

- Username: `amar`
- Password: `amar123`

## How Voting Works

- Each user can assign up to 3 ranks across dishes:
  - `rank1` = 30 points
  - `rank2` = 20 points
  - `rank3` = 10 points
- A dish can only occupy one rank per user.
- Votes are stored in memory in the app state (`votesByUser`).

## Data Source

Dishes are fetched client-side from:

- `https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json`

## Project Structure

```
src/
  app/
    page.js                  # Login page (/)
    dashboard/
      page.jsx               # Dashboard shell + hero section
      vote-tab.jsx           # Voting view
      results-tab.jsx        # Results view (podium + grid)
      dish-card.jsx          # Dish card + rank buttons
      result-card.jsx        # Leaderboard item card
    data/
      users.json             # Demo users
    providers/
      app-provider.jsx       # Global state + localStorage session + dish fetch
    globals.css              # Tailwind + design tokens
  components/
    ui/                      # Reusable UI primitives (button, card, tabs, ...)
```

## Notes

- This app uses **client-side auth** (localStorage) for demo purposes.
- If you want to reset the session, clear the browser storage for the site.
