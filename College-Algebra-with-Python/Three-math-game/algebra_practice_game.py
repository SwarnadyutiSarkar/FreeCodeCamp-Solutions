import random

def algebra_practice_game(num_questions=5, difficulty='medium'):
    if difficulty == 'easy':
        range_min, range_max = -10, 10
    elif difficulty == 'medium':
        range_min, range_max = -20, 20
    elif difficulty == 'hard':
        range_min, range_max = -50, 50
    else:
        print("Invalid difficulty level. Using medium difficulty.")
        range_min, range_max = -20, 20

    for i in range(num_questions):
        a = random.randint(range_min, range_max)
        b = random.randint(range_min, range_max)
        operator = random.choice(['+', '-'])

        if operator == '+':
            question = f"What is {a} + {b}?"
            answer = a + b
        else:
            question = f"What is {a} - {b}?"
            answer = a - b

        user_answer = int(input(question + " "))

        if user_answer == answer:
            print("Correct!")
        else:
            print(f"Incorrect. Correct answer is {answer}")

# Example usage:
algebra_practice_game(num_questions=5, difficulty='medium')
