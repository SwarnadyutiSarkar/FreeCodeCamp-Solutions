import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Sample data (can be replaced with your dataset)
health_costs_data = {
    'age': [28, 35, 42, 55, 26, 48, 60, 34, 36, 44],
    'bmi': [25.5, 31.2, 29.1, 24.5, 22.3, 36.7, 29.8, 27.6, 33.4, 28.9],
    'children': [0, 1, 2, 0, 3, 1, 2, 0, 1, 2],
    'smoker': [0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    'charges': [3233, 4625, 6540, 3330, 13145, 14563, 16347, 4826, 5468, 7375]
}

# Create a DataFrame
health_costs_df = pd.DataFrame(health_costs_data)

# Separate features (X) and target variable (y)
X = health_costs_df[['age', 'bmi', 'children', 'smoker']]
y = health_costs_df['charges']

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

# Create a linear regression model
model = LinearRegression()

# Train the model using the training sets
model.fit(X_train, y_train)

# Make predictions using the testing set
y_pred = model.predict(X_test)

# Print model coefficients and intercept
print('Coefficients:', model.coef_)
print('Intercept:', model.intercept_)

# Evaluate the model
print('Mean Squared Error:', mean_squared_error(y_test, y_pred))
print('Coefficient of Determination (R^2):', r2_score(y_test, y_pred))

# Example prediction
example_input = [[40, 28.5, 2, 1]]  # Predict health costs for a 40-year-old smoker with BMI 28.5 and 2 children
predicted_cost = model.predict(example_input)
print('Predicted Health Costs:', predicted_cost[0])
