# Assessment Memory Game
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.w3schools.com/typescript/index.php)

🔗 **Live Site:** [View Here](https://assessment-memory-game.vercel.app)

A  **modern web app** for a **Memory Match game** where players flip cards to find pairs—shuffled each round, matched cards fade out, supports **2×2, 4×4, 6×6** boards, and tracks best scores per category with a responsive UI.

---

## Features

- Flip 2 cards per turn to find matching pairs
- Shuffled deck on start and reset
- Board sizes: 2×2, 4×4, 6×6
- Timer & moves displayed during play
- Best scores saved in localStorage
- Completion modal with results & “Play again”

---

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)

**package.json (partial)**

```json
{
  "name": "assessment-memory-game",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "sass": "^1.93.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.35.0",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.2",
    "eslint": "^9.35.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.4.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.43.0",
    "vite": "^7.1.6"
  }
}
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PedroPeterrr/Assessment-Memory-Game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Assessment-Memory-Game
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Application

```bash
pnpm run dev
```
This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` to see the application.

