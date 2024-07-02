import matplotlib.pyplot as plt
import numpy as np

def projectile_game():
    wall_height = np.random.randint(5, 20)  # Random wall height
    wall_location = np.random.randint(5, 15)  # Random wall location

    plt.figure(figsize=(8, 6))
    plt.plot([wall_location, wall_location], [0, wall_height], color='black')  # Plotting the wall
    plt.title('Projectile Game')
    plt.xlabel('Distance')
    plt.ylabel('Height')
    plt.xlim(0, 20)
    plt.ylim(0, 25)
    plt.grid(True)

    plt.show()

    print(f"Adjust the parabolic path to clear the wall at ({wall_location}, {wall_height})")
    a = float(input("Enter a (coefficient of x^2): "))
    b = float(input("Enter b (coefficient of x): "))
    c = float(input("Enter c (constant): "))

    # Plotting the parabolic path
    x = np.linspace(0, 20, 100)
    y = a * x**2 + b * x + c
    plt.figure(figsize=(8, 6))
    plt.plot(x, y, label=f'y = {a}x^2 + {b}x + {c}')
    plt.plot([wall_location, wall_location], [0, wall_height], color='black')  # Re-plotting the wall
    plt.title('Projectile Game - Adjusted Path')
    plt.xlabel('Distance')
    plt.ylabel('Height')
    plt.xlim(0, 20)
    plt.ylim(0, 25)
    plt.grid(True)
    plt.legend()
    plt.show()

# Example usage:
projectile_game()
