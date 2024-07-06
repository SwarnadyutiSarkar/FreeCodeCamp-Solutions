import pandas as pd
from sklearn.neighbors import NearestNeighbors

# Sample data (can be replaced with your dataset)
books_data = {
    'BookID': [1, 2, 3, 4, 5],
    'Title': ['Book A', 'Book B', 'Book C', 'Book D', 'Book E'],
    'Author': ['Author 1', 'Author 2', 'Author 3', 'Author 1', 'Author 2'],
    'Genre': ['Fiction', 'Non-fiction', 'Fiction', 'Fiction', 'Non-fiction']
}

# Create a DataFrame
books_df = pd.DataFrame(books_data)

# Feature extraction (for example purposes, you might use more relevant features)
features = ['BookID', 'Genre']

# Convert categorical features to numerical using one-hot encoding
books_df_encoded = pd.get_dummies(books_df[features])

# Fit the KNN model
model = NearestNeighbors(n_neighbors=3, algorithm='ball_tree')
model.fit(books_df_encoded)

# Example book for recommendation
query_book = [3, 0, 1]  # This represents BookID=3, Genre=Fiction (one-hot encoded)

# Find nearest neighbors
distances, indices = model.kneighbors([query_book])

# Print recommended books
print("Recommended Books:")
for index in indices.flatten():
    print(f"- {books_df.iloc[index]['Title']} by {books_df.iloc[index]['Author']}")

