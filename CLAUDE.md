# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal countdown web app for tracking time until leaving a project/company. Target exit date: October 2025.

**Current Status**: Production-ready countdown app with animations, theming, and progress tracking
**Future Plans**: Social platform for workplace reviews (targeting foreign workers in Japan), potentially migrating heavy operations to separate Rails backend or keeping integrated with Next.js API routes

## Tech Stack

### Core Framework
- **Framework**: Next.js 16.1.0 (App Router with Turbopack)
- **React**: 19.2.3 (latest features)
- **Rendering**: Client-side with localStorage persistence
- **TypeScript**: 5.9.3 (strict mode enabled)
- **Package Manager**: npm (package-lock.json)

### Styling & UI
- **Styling**: Tailwind CSS v4.1.18 with OKLCH color system
- **Fonts**: Geist Sans & Geist Mono
- **Animation**: Motion 12.23.26 (Framer Motion alternative)
- **Theme System**: next-themes 0.4.6 (light/dark/system modes)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: lucide-react

### Form & Validation
- **Forms**: react-hook-form 7.54.2
- **Validation**: Zod 3.24.1
- **Date Picker**: react-day-picker 9.4.4

### Utilities
- **Date Libraries**: date-fns 4.1.0 & dayjs 1.11.13
- **CSS Utilities**: clsx, tailwind-merge, class-variance-authority

### Development Tools
- **Linting/Formatting**: Biome 2.3.10 (replaces ESLint + Prettier)
- **Build Tool**: Turbopack (built into Next.js 16)

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

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with Geist fonts & ThemeProvider
│   ├── page.tsx                # Main countdown orchestrator (client component)
│   └── globals.css             # Global Tailwind v4 styles with OKLCH colors
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx          # CVA-based button with variants
│   │   ├── calendar.tsx        # Date picker component
│   │   └── input.tsx           # Text input component
│   ├── CountdownDisplay.tsx    # Main countdown with animated time units
│   ├── CountdownForm.tsx       # Date selection form with validation
│   ├── ProgressBar.tsx         # Animated gradient progress bar
│   ├── ThemeProvider.tsx       # next-themes wrapper component
│   └── ThemeToggle.tsx         # Dark/light mode toggle button
├── hooks/
│   └── useCountdown.ts         # Core countdown logic & calculations
├── lib/
│   └── utils.ts                # Tailwind class merging utility
└── public/                     # Static assets
```

## Implemented Features

### Core Functionality
- **Real-time Countdown**: Updates every second with days, hours, minutes, seconds
- **Progress Tracking**: Visual progress bar from start date to exit date
- **Date Customization**: Set custom exit date and optional start date
- **LocalStorage Persistence**: Dates persist across page refreshes
- **Celebration Mode**: Animated "Freedom!" message when countdown ends

### Visual & UX
- **Dark/Light Mode**: Full theme system with system preference detection
- **Micro-animations**: Scale, pulse, and glow effects on countdown units
- **Color Gradients**: Dynamic progress bar colors (green → blue → purple)
- **Urgency Indicators**: Red styling when < 7 days remain
- **Responsive Design**: 2-column mobile grid, 4-column desktop grid
- **Smooth Transitions**: AnimatePresence for page state changes

### Form & Validation
- **Zod Schema**: Exit date (required, future only), Start date (optional, past only)
- **Interactive Calendars**: Date pickers with disabled date validation
- **Toggle Controls**: Optional start date with toggle switch
- **Form State**: Real-time validation feedback

## Architecture Details

### State Management
- **localStorage**: Stores `exitDate` and `startDate` as ISO strings
- **React State**: Component-level state for countdown values
- **Custom Hook**: `useCountdown` encapsulates countdown logic

### Animation System
- **Motion Library**: All animations via Motion (formerly Framer Motion)
- **AnimatePresence**: Smooth transitions between form/countdown states
- **Keyframes**: Scale pulses, shimmer effects, rotation transitions

### Color System
- **OKLCH Colors**: Perceptually uniform color space for consistent appearance
- **CSS Custom Properties**: All design tokens as CSS variables
- **Dynamic Theming**: Automatic theme switching with next-themes

### TypeScript Configuration
- **Path Alias**: `@/*` maps to project root
- **Strict Mode**: Enabled for type safety
- **Target**: ES2017
- **Module Resolution**: Bundler mode

### Biome Configuration
- **Rules**: Recommended Next.js and React rules
- **Auto-organize**: Imports sorted on save
- **Indentation**: 2 spaces
- **Ignores**: node_modules, .next, dist, build

## Code Conventions

- **Component Pattern**: Functional components with TypeScript
- **Client Components**: Use "use client" directive for interactive components
- **Custom Hooks**: Prefix with `use` (e.g., `useCountdown`)
- **Styling**: Tailwind utility classes with `cn()` helper
- **Animations**: Motion components with declarative animations
- **Form Handling**: react-hook-form with Zod schemas
- **Date Logic**: Prefer dayjs for calculations, date-fns for formatting

## Key Components Explained

### `useCountdown` Hook
- Calculates time remaining from now to target date
- Computes progress percentage from start to target
- Updates every second via setInterval
- Returns: days, hours, minutes, seconds, progress, isExpired, isUrgent

### `CountdownDisplay`
- Renders 4 time unit cards with animations
- Shows progress bar with dynamic gradient colors
- Displays celebration state when expired
- Each time unit pulses when value changes

### `CountdownForm`
- Two calendar inputs: start date (optional), exit date (required)
- Zod validation prevents invalid date selections
- Toggle switch for enabling custom start date
- Saves to localStorage on submit

### `ProgressBar`
- Shimmer animation sweeps left-to-right continuously
- Color changes based on progress: green → blue → purple (→ red if urgent)
- Animated percentage text with scale effect
- Smooth transitions with easing

## Not Yet Implemented

- Social platform features (workplace reviews)
- User accounts and authentication
- Backend API (Rails or Next.js API routes)
- Database integration
- Multi-user support
- Server-side rendering for countdown data

## Notes for Claude Code

- This is a **pure client-side app** - no API routes or backend currently in use
- All state lives in localStorage and React component state
- Follow existing animation patterns when adding new features
- Maintain accessibility (ARIA attributes, keyboard navigation)
- Use existing color system (OKLCH variables) for consistency
- Test both light and dark modes for new features
- Validate dates appropriately (future for exit, past for start)