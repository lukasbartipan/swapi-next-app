# Alliance Personnel Archive

A modern Star Wars character archive built with Next.js (App Router), HeroUI, and Tailwind. It uses server-side data fetching for SWAPI and client-side search/filter/pagination with a keyboard-accessible dossier drawer.

## Highlights

- **SSR data fetch** with 24h caching for SWAPI.
- **Client explorer** with search, filters, and pagination over the full dataset.
- **A11y-first**: skip link, keyboard-only drawer flow, and live result updates.
- **Dossier Drawer**: quick copy of a character's profile.

## Data Sources

- SWAPI: https://swapi.py4e.com/
- Image Archive: https://vieraboschkova.github.io/swapi-gallery/

## Requirements

- Node.js 18+ (recommended 22+)
- npm (or pnpm/yarn/bun)

## Running Locally

```bash
npm install
npm run dev
```

## Architecture & Implementation

- **Tech stack**: Next.js, React, TypeScript, HeroUI, Tailwind CSS, Framer Motion, next-themes. See `package.json`.
- **UI system**: HeroUI components + Tailwind utility classes, custom theme/background layers, and Google fonts. See `app/providers.tsx`, `app/layout.tsx`, `styles/globals.css`, `config/fonts.ts`.
- **Data flow**: Server component `components/people/PeopleData.tsx` calls `fetchAllPeopleCached` (server-only) which fetches from SWAPI, normalizes the data, and caches with `revalidate` + React `cache` in `lib/swapi.ts`. Trade-off: no separate API route, but fewer hops and server-side shaping keeps the client simple.
- **Filtering & pagination**: Client filtering in `components/people/PeopleExplorer.tsx` via `useMemo`/`useState` with search, gender, eye color, height min/max, and name sort; pagination uses HeroUI `Pagination`. Filter UI lives in `components/people/PeopleFilters.tsx`. Trade-off: larger initial payload in exchange for instant, offline‑friendly filtering.
- **Loading UX**: Suspense for data-loading skeletons; image skeletons handled per-card.

## Accessibility

- Skip link to main content in `app/layout.tsx`.
- All interactive elements are keyboard accessible.

## TODO / Next Ideas

- Saved filter presets for recurring missions.
- Export dossier to PDF.
