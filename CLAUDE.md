# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal countdown web app for tracking time until leaving a project/company. Target exit date: October 2025.

**Current Phase**: Pure client-side countdown implementation
**Future Plans**: Social platform for workplace reviews (targeting foreign workers in Japan), potentially migrating heavy operations to separate Rails backend or keeping integrated with Next.js API routes

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Rendering**: Client-side (initial phase)
- **Styling**: Tailwind CSS v4 with Geist fonts
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)
- **TypeScript**: Strict mode enabled
- **Package Manager**: npm (based on lockfile)

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Production server
npm start

# Lint (check for issues)
npm run lint

# Format code
npm run format
```

Development server runs at http://localhost:3000

## Architecture

**Structure**: Standard Next.js App Router setup

- `app/layout.tsx`: Root layout with Geist font configuration
- `app/page.tsx`: Main page component
- `app/globals.css`: Global styles (Tailwind directives)

**TypeScript Config**:

- Path alias `@/*` maps to project root
- Strict mode enabled
- Target: ES2017

**Biome Configuration**:

- Recommended rules for Next.js and React
- Auto-organize imports on save
- 2-space indentation
- Ignores: node_modules, .next, dist, build
