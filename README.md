# COMP717 AI Game Assignment

This project implements a multi-game AI agent using **Minimax** and **Alpha-Beta Pruning** algorithms. The games supported include:

- Tic-Tac-Toe (3x3 and 7x7)
- Connect Four (5x4 and 8x7)
- Nim (Classic 1,3,5,7 heaps, scalable to 4+ heaps)
- Tiger vs Dogs

Developed as part of Assignment 1 for AUT's COMP717 course.

---

## 🛠 Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

---

## 🚀 Setup Instructions

1. **Clone or extract** the project:
   ```bash
   git clone https://github.com/your-username/COMP717-AI-Assignment.git
   cd COMP717-AI-Assignment/ai_assignment
   ```

   Or if extracted from a `.zip`, navigate into the `ai_assignment` folder.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start (make sure you cd to ai_assignment (cd ai_assignment) before using "npm start")
   ```

   This will launch the app in your browser at `http://localhost:3000`.

---

## 🧠 How It Works

Each game implements both:

- **Complete Search**: Exhaustive tree search (Minimaxcomplete, ABcomplete)
- **Depth-Limited Search**: With evaluation functions (Minimaxlimited, ABlimited)

### Component Structure

- `src/Components/AiAssignment/` – Contains all the AI game components and menus.
- `src/utils/` – Utility functions and helpers (if applicable).
- `public/` – Static assets.

Games allow for:
- **Human vs AI**
- **AI vs AI**
- **Human vs Human** (for testing purposes)

Depth selection menus are available for AI modes, and logic limits the maximum selectable depth based on known hardware-safe thresholds.

---

## 🧪 Running Tests (Optional)

To run React test suites:
```bash
npm test
```

---

## 💡 Notes

- Built using **ReactJS**
- AI logic based on standard Minimax and Alpha-Beta pruning algorithms
- Evaluation functions and scalability logic are custom-developed

---

## 📂 Directory Overview

```plaintext
ai_assignment/
├── public/                 # Static files
├── src/
│   ├── Components/
│   │   └── AiAssignment/  # Game components & AI logic
│   ├── index.js           # Entry point
│   └── App.js             # App root component
├── package.json           # Project config
└── README.md              # Project info
```

