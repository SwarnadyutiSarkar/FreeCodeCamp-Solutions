import random
from copy import deepcopy

class Hat:
    def __init__(self, **kwargs):
        self.contents = []
        for color, count in kwargs.items():
            self.contents.extend([color] * count)

    def draw(self, num_balls):
        if num_balls >= len(self.contents):
            drawn_balls = self.contents
            self.contents = []
        else:
            drawn_balls = random.sample(self.contents, num_balls)
            for ball in drawn_balls:
                self.contents.remove(ball)
        return drawn_balls

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    successes = 0
    for _ in range(num_experiments):
        experiment_hat = deepcopy(hat)
        drawn_balls = experiment_hat.draw(num_balls_drawn)
        ball_counts = {}
        for ball in drawn_balls:
            if ball in ball_counts:
                ball_counts[ball] += 1
            else:
                ball_counts[ball] = 1
        success = True
        for color, count in expected_balls.items():
            if color not in ball_counts or ball_counts[color] < count:
                success = False
                break
        if success:
            successes += 1
    return successes / num_experiments

# Example usage:
hat = Hat(blue=5, red=4, green=2)
probability = experiment(hat, {"red": 1, "green": 2}, 4, 2000)
print(probability)