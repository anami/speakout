# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SpeakOut is a text-to-speech web application using the HTML5 Web Speech API, built with Svelte 5 + SvelteKit + Vite. The UI is neobrutalist with a magenta primary, neon‑yellow accent, bold borders/shadows, and the Fredoka One display font.

## Setup

Requires **Node 22** (LTS). An `.nvmrc` is provided.

```bash
nvm use
npm install
```

## Build Commands

```bash
# Development server (port 4000 with hot reload)
npm start        # or: npm run dev

# Production build (outputs to build/)
npm run build

# Preview production build
npm run preview
```

## Architecture

### SvelteKit SPA

The app runs as a client-side SPA (`ssr: false`, `adapter-static`). The entire app depends on the browser-only `window.speechSynthesis` API.

### Component Structure

Components live in `src/lib/components/`:

- **SpeakoutApp.svelte** — Root component wiring textarea, controls, options, and share link
- **ProgressBar.svelte** — Play/stop buttons + progress bar
- **OptionsPanel.svelte** — Voice selector, pitch/rate/volume sliders, reset button, close button
- **ShareLink.svelte** — Generates URL-encoded shareable links (readonly, click-to-select)
- **NoSpeech.svelte** — Fallback for unsupported browsers
- **icons/** — PlayIcon, StopIcon (SVG components using `currentColor`)

### Speech Engine

`src/lib/speech.svelte.ts` — All Web Speech API logic as a reactive Svelte 5 runes module (`$state`, `$derived`). Created via `createSpeechEngine()` factory function.

### Routes

- `src/routes/+layout.ts` — `ssr=false`, `prerender=true`
- `src/routes/+layout.svelte` — Header, footer, global CSS import
- `src/routes/+page.svelte` — Mounts SpeakoutApp

### Data Flow

User input → Svelte 5 reactive state → SpeechSynthesis API → Boundary events → Progress bar updates

## Key Implementation Details

- Voice enumeration uses `speechSynthesis.getVoices()` with `onvoiceschanged` event + Firefox/Safari fallback
- Audio parameters: pitch (0-2), rate (0.1-10), volume (0-1) — range inputs scaled by 10
- Progress tracking relies on utterance boundary events (may not work with all voices)
- Query string support enables pre-filled phrases via `?phrase=` URL parameter
- Options panel toggles via a labeled button and animates in/out with a small slide

## Notes

- No test framework configured
- Browser compatibility: Chrome, Firefox, Safari (requires Web Speech API support)
- Neobrutalist theme: heavy borders/shadows, magenta + neon accent, subtle animated grid/dot background, minimal radius

## Recent UI Changes

- Added sticker-style section labels for Text/Controls/Share
- Replaced the options cog with a labeled toggle and a panel close button
- Added background animation with reduced-motion support
