# BrainQuest

A gamified Olympiad-prep quiz app for kids, built as a single React component (`BrainQuest.jsx`).

## What it is

BrainQuest turns Olympiad-style practice (Numerical Ability, Patterns & Operations, Logical Reasoning, Visual Thinking & Geometry, and Memory & Life Skills) into a world-map adventure:

- **5 worlds** (Number Kingdom, Pattern Planet, Logic Land, Shape City, Brain Galaxy), each with **ThinkSheets** — short sets of 6 multiple-choice questions with explanations and a "what did I learn" takeaway after every answer.
- **Progression & unlocking** — worlds and ThinkSheets unlock in order as earlier ones are completed.
- **Scoring** — points, streak bonuses, star ratings (1–3) per ThinkSheet based on accuracy, and badges (e.g. world-mastery badges, a 5-streak badge, an Olympiad Champion badge).
- **Olympiad Arena** — a 10-question mock test that unlocks after 4 ThinkSheets are completed.
- **Past Papers Vault** — a separate, always-unlocked section with 10 original practice papers styled after each year from 2016–2025 (sorted newest first), 8 questions each. Like ThinkSheets, every question reveals the correct answer and explanation immediately after you pick or submit an option, and each paper's score/stars is saved.
- **Practice Papers** — printable PDF worksheets from the `worksheets/` folder, grouped by topic (one sub-folder per topic). They have no answer keys: kids open/print them, solve on paper, and tick each one off as done. On desktop the PDF is shown inline next to the topic and paper lists; on phones each paper opens in the device's PDF viewer.
- **Parent Dashboard** — accuracy by category, strong/weak areas, highest difficulty reached, an "Olympiad readiness" percentage, past papers completed, and a progress reset option.

All state (profile, points, completed ThinkSheets, badges, worksheets marked done) is saved to `localStorage`, so progress survives a page reload on the same browser.

## Tech

- React (functional components, hooks: `useState`, `useMemo`)
- [lucide-react](https://lucide.dev/) for icons
- Inline styles (no CSS framework); fonts loaded from Google Fonts (`Baloo 2`, `Nunito`)

## How to run

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`). `npm run build` produces a static site in `dist/`, with the worksheet PDFs bundled in.

## Editing content

All questions live in the `WORLDS` array, `OLYMPIAD_TEST` object, and `PAST_PAPERS` array at the top of `BrainQuest.jsx`. Each question has `prompt`, optional `visual`, `options`, `correct` (index), `explanation`, `takeaway`, and `skill` fields — add or edit entries there to change the question bank. Each entry in `PAST_PAPERS` also has `id`, `year`, `title`, and `difficulty`; add a new object to extend the vault to another year.

To add practice worksheets, drop PDFs into `worksheets/<Topic>/` — a new folder becomes a new topic automatically. Papers are ordered by filename, numbers in natural order (e.g. `worksheet (9).pdf` before `worksheet (12).pdf`), and shown as "Practice Paper 1, 2, …". Display names, emojis and colors for known folders are set in `WORKSHEET_TOPIC_META` in `BrainQuest.jsx`.
