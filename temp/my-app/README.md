# AI Touch Typing Trainer

A futuristic, dark, glassmorphism-styled typing trainer that adapts to user weaknesses in real time. All data is stored locally (localStorage). No backend required.

## Features

- **Adaptive Learning**: Tracks your typing patterns and identifies weak keys and bigrams
- **Multiple Modes**: Quick Test (30/60/120s), Paragraph, and Free Type modes
- **Real-time Metrics**: Live WPM, accuracy, and error tracking
- **Drill Generator**: Creates custom drills focused on your weak points
- **Analytics Dashboard**: View your progress with streaks and performance trends
- **Fully Offline**: All data is stored locally in your browser
- **Glassmorphism UI**: Modern dark theme with glass-like UI elements

## Tech Stack

- React + TypeScript
- TailwindCSS for styling
- React Router for client-side routing
- localStorage for data persistence

## Folder Structure

```
src/
├── play/          # Core practice engine
├── drills/        # Adaptive drills + custom drill builder
├── analytics/     # History + sparkline + streak tracking
├── settings/      # Layout, theme, sound, data management
├── components/    # Reusable UI components
├── state/         # Application state management
├── utils/         # Utility functions
```

## Getting Started

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

## Usage

1. Navigate to the Play page to start a typing session
2. Choose your preferred mode, duration, and difficulty
3. Type the displayed text as accurately and quickly as possible
4. View your results and identified weak keys/bigrams
5. Use the Drills page to generate adaptive practice sessions
6. Check the Analytics page to track your progress over time
7. Adjust settings in the Settings page as needed

## Data Management

All data is stored locally in your browser's localStorage:
- Typing sessions and performance history
- Weakness profiles (keys and bigrams you struggle with)
- Settings and preferences

You can export/import this data or clear it entirely from the Settings page.