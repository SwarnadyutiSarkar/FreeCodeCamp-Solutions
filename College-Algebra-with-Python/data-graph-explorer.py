import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def load_csv_from_local():
    """
    Function to upload a .csv file from local computer.
    Returns a Pandas DataFrame.
    """
    csv_file = input("Please enter the path to the .csv file on your local computer: ")
    df = pd.read_csv(csv_file)
    return df

def load_csv_from_url(url=None):
    """
    Function to load a .csv file from a URL.
    Returns a Pandas DataFrame.
    """
    if not url:
        url = input("Please enter the URL of the .csv file: ")
    df = pd.read_csv(url)
    return df

def print_head_and_rows(df):
    """
    Print column headings and the first two rows of the DataFrame.
    """
    print("Column Headings:")
    print(list(df.columns))
    print("\nFirst two rows:")
    print(df.head(2))

def select_and_plot_columns(df):
    """
    Select columns from the DataFrame, convert to Numpy arrays, and plot.
    """
    print("\nAvailable columns:")
    print(list(df.columns))
    
    column1 = input("Enter the first column name for plotting: ")
    column2 = input("Enter the second column name for plotting (leave empty if only one column desired): ")
    
    if column1 not in df.columns:
        print(f"Column '{column1}' not found in DataFrame.")
        return
    if column2 and column2 not in df.columns:
        print(f"Column '{column2}' not found in DataFrame.")
        return
    
    x_data = df[column1].to_numpy()
    y_data = df[column2].to_numpy() if column2 else None
    
    if y_data is not None:
        plt.scatter(x_data, y_data)
        plt.xlabel(column1)
        plt.ylabel(column2)
        plt.title(f'Scatter plot of {column1} vs {column2}')
    else:
        plt.plot(x_data)
        plt.xlabel('Index')
        plt.ylabel(column1)
        plt.title(f'Line graph of {column1}')
    
    plt.show()

# Main program flow
if __name__ == "__main__":
    print("Choose how to load the .csv file:")
    print("1. Upload from local computer")
    print("2. Enter URL")
    print("3. Use hardcoded URL")
    choice = input("Enter your choice (1/2/3): ")
    
    if choice == '1':
        df = load_csv_from_local()
    elif choice == '2':
        url = input("Enter the URL of the .csv file: ")
        df = load_csv_from_url(url)
    elif choice == '3':
        # Hardcoded URL for testing
        url = "https://example.com/data.csv"  # Replace with your actual URL
        df = load_csv_from_url(url)
    else:
        print("Invalid choice. Exiting.")
        exit()
    
    print_head_and_rows(df)
    select_and_plot_columns(df)
