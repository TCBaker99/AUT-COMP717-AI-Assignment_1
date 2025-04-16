from flask import Flask, request, jsonify
from flask_cors import CORS
from minmax import best_move, check_winner

app = Flask(__name__)
CORS(app)

@app.route("/move", methods=["POST"])
def move():
    data = request.get_json()
    board = data["board"]
    ai = data["ai"]
    human = "o" if ai == "x" else "x"

    move_index = best_move(board, ai, human)
    board[move_index] = ai

    winner = check_winner(board)

    return jsonify({
        "board": board,
        "move": move_index,
        "winner": winner
    })

if __name__ == "__main__":
    app.run(debug=True)