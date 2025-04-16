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

def minmax(board, is_maximizing, ai, human):
    winner = check_winner(board)
    if winner == ai:
        return 10
    if winner == human:
        return -10
    if winner == "draw":
        return 0

    best = -float("inf") if is_maximizing else float("inf")
    for i in range(9):
        if board[i] == "":
            board[i] = ai if is_maximizing else human
            score = minmax(board, not is_maximizing, ai, human)
            board[i] = ""
            best = max(score, best) if is_maximizing else min(score, best)
    return best

def best_move(board, ai, human):
    best_score = -float("inf")
    move = -1
    for i in range(9):
        if board[i] == "":
            board[i] = ai
            score = minmax(board, False, ai, human)
            board[i] = ""
            if score > best_score:
                best_score = score
                move = i
    return move
