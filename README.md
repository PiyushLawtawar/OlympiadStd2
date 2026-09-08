# BrainQuest

A gamified Olympiad-prep quiz app for kids, built as a single React component (`BrainQuest.jsx`).

## What it is

BrainQuest turns Olympiad-style practice (Numerical Ability, Patterns & Operations, Logical Reasoning, Visual Thinking & Geometry, and Memory & Life Skills) into a world-map adventure:

- **5 worlds** (Number Kingdom, Pattern Planet, Logic Land, Shape City, Brain Galaxy), each with **ThinkSheets** — short sets of 6 multiple-choice questions with explanations and a "what did I learn" takeaway after every answer.
- **Progression & unlocking** — worlds and ThinkSheets unlock in order as earlier ones are completed.
- **Scoring** — points, streak bonuses, star ratings (1–3) per ThinkSheet based on accuracy, and badges (e.g. world-mastery badges, a 5-streak badge, an Olympiad Champion badge).
- **Olympiad Arena** — a 10-question mock test that unlocks after 4 ThinkSheets are completed.
- **Parent Dashboard** — accuracy by category, strong/weak areas, highest difficulty reached, an "Olympiad readiness" percentage, and a progress reset option.

All state (profile, points, completed ThinkSheets, badges) lives in React `useState` — there's no backend or persistence; progress resets on page reload.

## Tech

- React (functional components, hooks: `useState`, `useMemo`)
- [lucide-react](https://lucide.dev/) for icons
- Inline styles (no CSS framework); fonts loaded from Google Fonts (`Baloo 2`, `Nunito`)

The file currently has no surrounding project scaffold (no `package.json`), so it needs to be dropped into a React project to run.

## How to run

1. Scaffold a React app (Vite is fastest):
   ```bash
   npm create vite@latest brainquest -- --template react
   cd brainquest
   npm install
   npm install lucide-react
   ```
2. Replace the generated `src/App.jsx` with this repo's `BrainQuest.jsx` (or copy it in and update the import in `src/main.jsx` accordingly).
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the printed local URL (typically `http://localhost:5173`) in a browser.

## Editing content

All questions live in the `WORLDS` array and `OLYMPIAD_TEST` object at the top of `BrainQuest.jsx`. Each question has `prompt`, optional `visual`, `options`, `correct` (index), `explanation`, `takeaway`, and `skill` fields — add or edit entries there to change the question bank.
