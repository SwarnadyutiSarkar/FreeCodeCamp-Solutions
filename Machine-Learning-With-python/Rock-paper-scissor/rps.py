def player(prev_play, opponent_history=[]):
    # Track the opponent's move history
    if prev_play:
        opponent_history.append(prev_play)

    # If no previous play, return "R" for the first move
    if not opponent_history:
        return "R"
    
    # Strategy variables
    strategy_choice = len(opponent_history) % 3
    
    # Strategy 1: Mirror the opponent's previous move
    if strategy_choice == 0:
        return prev_play if prev_play else "R"
    
    # Strategy 2: Counter the opponent's previous move
    if strategy_choice == 1:
        counter_moves = {"R": "P", "P": "S", "S": "R"}
        return counter_moves[prev_play] if prev_play else "R"
    
    # Strategy 3: Use statistical analysis to predict the opponent's next move
    if strategy_choice == 2:
        if len(opponent_history) < 3:
            return "R"
        # Count the occurrences of R, P, S in the opponent's history
        count_R = opponent_history.count("R")
        count_P = opponent_history.count("P")
        count_S = opponent_history.count("S")
        # Predict the opponent's next move based on the most common move
        if count_R > count_P and count_R > count_S:
            return "P"  # Counter Rock with Paper
        elif count_P > count_R and count_P > count_S:
            return "S"  # Counter Paper with Scissors
        else:
            return "R"  # Counter Scissors with Rock
    
    # Fallback strategy if none of the above conditions are met
    return "R"

