# Artificial Intelligence A1 – Tic Tac Toe with Minimax AI Backend

This project is a React-based Tic Tac Toe game that uses a Python Flask API to handle Minimax AI logic.

---

## 📦 Project Structure

```
Artificial-Intelligence-A1/
├── backend/                 # Python Flask API for Minimax AI
│   ├── app.py
│   ├── minmax.py
│   └── requirements.txt
├── tic_tac_toe/            # React Frontend
│   └── src/Components/TicTacToe/TicTacMinMax.jsx
└── README.md               # You're here
```

---

## 🧠 Features
- Play against a perfect AI (Minimax algorithm)
- AI logic is handled server-side with Python
- React frontend dynamically interacts with the Flask API
- Easy to reset and replay

---

## ⚙️ Requirements
- Python 3.7+
- Node.js & npm

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/TCBaker99/AUT-COMP717-AI-Assignment_1.git
cd AUT-COMP717-AI-Assignment_1
```

---

### 2️⃣ Setup the Flask Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate         # On Windows: venv\Scripts\activate
pip install -r requirements.txt  # Or: pip install flask flask-cors
python app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000/
```

---

### 3️⃣ Setup the React Frontend

Open a second terminal:
```bash
cd tic_tac_toe
npm install
npm start
```

Then go to: `http://localhost:3000`

✅ You're now playing against a Python-powered Minimax AI!

---

## 🔧 Development Tips
- To edit AI logic: change `backend/minmax.py`
- To edit game visuals: update `tic_tac_toe/src/Components/TicTacToe/`
- To test game logic, use `POST /move` on `localhost:5000`

---

## 📂 Branches
- `main` – Original React-only version
- `flask-integration` – Uses Flask API for Minimax (safe to experiment here)

---

## 📬 Contact
Author: [Trey Baker](https://github.com/TCBaker99)
