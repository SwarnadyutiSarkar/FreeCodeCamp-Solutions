def arithmetic_arranger(problems, display_answers=False):
    if len(problems) > 5:
        return "Error: Too many problems."

    first_line = []
    second_line = []
    dashes = []
    answers = []

    for problem in problems:
        parts = problem.split()
        operand1 = parts[0]
        operator_ = parts[1]
        operand2 = parts[2]

        if operator_ not in ['+', '-']:
            return "Error: Operator must be '+' or '-'."

        if not operand1.isdigit() or not operand2.isdigit():
            return "Error: Numbers must only contain digits."

        if len(operand1) > 4 or len(operand2) > 4:
            return "Error: Numbers cannot be more than four digits."

        width = max(len(operand1), len(operand2)) + 2
        first_line.append(operand1.rjust(width))
        second_line.append(operator_ + operand2.rjust(width - 1))
        dashes.append('-' * width)

        if display_answers:
            result = str(eval(problem))
            answers.append(result.rjust(width))

    arranged_problems = []
    arranged_problems.append("    ".join(first_line))
    arranged_problems.append("    ".join(second_line))
    arranged_problems.append("    ".join(dashes))

    if display_answers:
        arranged_problems.append("    ".join(answers))

    return "\n".join(arranged_problems)

# Example usage:
problems = ["32 + 698", "3801 - 2", "45 + 43", "123 + 49"]
print(arithmetic_arranger(problems, True))
