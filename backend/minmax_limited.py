
def check_winner(board):
    wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for a, b, c in wins:
        if board[a] and board[a] == board[b] and board[b] == board[c]:
            return board[a]
    if "" not in board:
        return "draw"
    return None

def evaluate(board, ai, human):
    lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    score = 0
    for line in lines:
        values = [board[i] for i in line]
        if values.count(ai) == 2 and values.count("") == 1:
            score += 5
        elif values.count(ai) == 1 and values.count("") == 2:
            score += 2
        elif values.count(human) == 2 and values.count("") == 1:
            score -= 5
        elif values.count(human) == 1 and values.count("") == 2:
            score -= 2
    return score

def minmax_limited(board, depth, is_maximizing, ai, human):
    winner = check_winner(board)
    if winner == ai:
        return 10
    elif winner == human:
        return -10
    elif winner == "draw":
        return 0
    elif depth == 0:
        return evaluate(board, ai, human)

    best = -float("inf") if is_maximizing else float("inf")
    for i in range(9):
        if board[i] == "":
            board[i] = ai if is_maximizing else human
            score = minmax_limited(board, depth - 1, not is_maximizing, ai, human)
            board[i] = ""
            best = max(score, best) if is_maximizing else min(score, best)
    return best

def best_move_limited(board, ai, human, depth):
    best_score = -float("inf")
    move = -1
    for i in range(9):
        if board[i] == "":
            board[i] = ai
            score = minmax_limited(board, depth - 1, False, ai, human)
            board[i] = ""
            if score > best_score:
                best_score = score
                move = i
    return move
