from flask import Flask, request, jsonify
from flask_cors import CORS
from minmax import best_move, check_winner
from alphabeta import best_move_ab  
from minmax_limited import best_move_limited as best_move_ltd
from alphabeta_limited import best_move_ab_limited as best_move_ab_ltd

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

@app.route("/move-ab", methods=["POST"])
def move_ab():
    data = request.get_json()
    board = data["board"]
    ai = data["ai"]
    human = "o" if ai == "x" else "x"

    move_index = best_move_ab(board, ai, human)
    board[move_index] = ai

    winner = check_winner(board)

    return jsonify({
        "board": board,
        "move": move_index,
        "winner": winner
    })

@app.route("/move-limited", methods=["POST"])
def move_limited():
    data = request.get_json()
    board = data["board"]
    ai = data["ai"]
    depth = data["depth"]
    human = "o" if ai == "x" else "x"

    move_index = best_move_ltd(board, ai, human, depth)
    board[move_index] = ai
    winner = check_winner(board)

    return jsonify({
        "board": board,
        "move": move_index,
        "winner": winner
    })

@app.route("/move-ab-limited", methods=["POST"])
def move_ab_limited():
    data = request.get_json()
    board = data["board"]
    ai = data["ai"]
    depth = data["depth"]
    human = "o" if ai == "x" else "x"

    move_index = best_move_ab_ltd(board, ai, human, depth)
    board[move_index] = ai
    winner = check_winner(board)

    return jsonify({
        "board": board,
        "move": move_index,
        "winner": winner
    })

if __name__ == "__main__":
    app.run(debug=True)
