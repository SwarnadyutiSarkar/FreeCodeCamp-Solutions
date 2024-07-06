import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping

# Sample SMS dataset (replace with your dataset)
sms_data = {
    'text': ["Hey there, how are you?", "Free entry in 2 a wkly comp to win FA Cup final tkts 21st May 2005.", 
             "You have won a guaranteed 32000 award or maybe even £1000 cash.", "URGENT! You have won a 1 week FREE membership in our £100000 prize Jackpot!"],
    'label': ["ham", "spam", "spam", "spam"]
}

# Create a DataFrame
sms_df = pd.DataFrame(sms_data)

# Encode labels
encoder = LabelEncoder()
sms_df['label'] = encoder.fit_transform(sms_df['label'])

# Tokenization and padding
max_words = 1000
tokenizer = Tokenizer(num_words=max_words, oov_token='<OOV>')
tokenizer.fit_on_texts(sms_df['text'])
sequences = tokenizer.texts_to_sequences(sms_df['text'])
max_len = max(len(sequence) for sequence in sequences)
X = pad_sequences(sequences, maxlen=max_len)

# Prepare target variable
y = sms_df['label']

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build the model
embedding_dim = 16
model = Sequential([
    Embedding(max_words, embedding_dim, input_length=max_len),
    LSTM(64),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Define early stopping
early_stopping = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)

# Train the model
epochs = 10
history = model.fit(X_train, y_train, epochs=epochs, validation_data=(X_test, y_test), callbacks=[early_stopping])

# Evaluate the model
loss, accuracy = model.evaluate(X_test, y_test)
print(f'Test Accuracy: {accuracy}')

# Example prediction
example_text = ["You won a free vacation!"]
example_sequence = tokenizer.texts_to_sequences(example_text)
example_padded = pad_sequences(example_sequence, maxlen=max_len)
prediction = model.predict(example_padded)
predicted_label = 'spam' if prediction > 0.5 else 'ham'
print(f'Example Prediction: {predicted_label} (Confidence: {prediction[0][0]})')
