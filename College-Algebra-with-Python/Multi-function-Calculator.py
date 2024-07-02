# Write your code here
import fractions

def solve_proportion(a, b, c=None, d=None):
    if c is None or d is None:
        # Solve for missing value
        if a is None:
            return (c * b) / d
        elif b is None:
            return (a * d) / c
        elif c is None:
            return (a * d) / b
        elif d is None:
            return (c * b) / a
    else:
        return a / b == c / d

def solve_equation(a, b, c=None):
    if c is None:
        return (c - b) / a
    else:
        return a * c + b

def factor_square_root(n):
    root = math.isqrt(n)
    if root * root == n:
        return f"{root}"
    else:
        return f"sqrt({n})"

def convert_decimals(value):
    fraction = fractions.Fraction(value).limit_denominator()
    percent = fraction * 100
    return fraction, percent

def convert_fractions(fraction):
    decimal = float(fraction.numerator) / float(fraction.denominator)
    percent = decimal * 100
    return decimal, percent

def convert_percents(percent):
    decimal = percent / 100
    fraction = fractions.Fraction(decimal).limit_denominator()
    return decimal, fraction

# Example usage:
a = 1
b = 2

# Solve Proportion
result = solve_proportion(2, None, 4, 5)
print("Solve Proportion:", result)

# Solve Equation
result = solve_equation(3, 4, 10)
print("Solve Equation:", result)

# Factor Square Root
result = factor_square_root(25)
print("Factor Square Root:", result)

# Convert Decimals
result = convert_decimals(0.75)
print("Convert Decimals:", result)

# Convert Fractions
result = convert_fractions(fractions.Fraction(3, 4))
print("Convert Fractions:", result)

# Convert Percents
result = convert_percents(50)
print("Convert Percents:", result)


# This step does not have test