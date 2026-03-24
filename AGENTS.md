# AGENTS

## Cursor Cloud specific instructions

This is the **FORM Body Alignment App** — a React Native/Expo mobile app with a Node.js/Express API server, structured as an npm workspaces monorepo.

### Repository structure

- `mobile/` — Expo 55 + React Native app (TypeScript). Uses Expo Router for navigation.
- `server/` — Node.js + Express API server (TypeScript). Port 3000 by default.
- Root `package.json` — npm workspaces configuration linking both packages.

### Branch convention

- Default branch is `Main` (capital M).

### Running services

- **Server:** `npm run dev --workspace=server` (uses tsx watch, auto-reloads on changes, runs on port 3000)
- **Mobile web:** `cd mobile && npx expo start --web --port 8081`
- **Mobile native:** `cd mobile && npx expo start` (requires Expo Go app on device or simulator)
- The server must be running for the full flow to work end-to-end once API integration is connected.

### Lint / Type-check / Test

- **Server lint:** `npm run lint --workspace=server`
- **Server type-check:** `cd server && npx tsc --noEmit`
- **Server tests:** `npm run test --workspace=server` (Jest, 26 tests covering rule engine, routine generator, and API endpoints)
- **Mobile type-check:** `cd mobile && npx tsc --noEmit`

### Design system

- The app follows "Body Anatomy Brutalism" style — see `mobile/constants/theme.ts` for exact color hex codes and font names.
- Only two fonts: **Bebas Neue** (headings/scores) and **DM Mono** (data labels/clinical readouts).
- Detailed design rules are in the build document (Section I).

### Key gotchas

- When running Expo on web, `react-native-web`, `react-dom`, and `@expo/metro-runtime` must be installed — they are listed as dev dependencies.
- The posture scan is a **fake animation** in the MVP (no real camera/AI). Real AI detection is planned for Phase 3.
- The exercise library is seeded as a TypeScript file (`server/src/seeds/exerciseData.ts`) with 24 exercises; it will move to a Supabase database in future sprints.
