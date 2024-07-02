import math

def mortgage_payment(principal, annual_rate, years):
    """
    Calculates the monthly mortgage payment.
    
    Args:
    - principal (float): The principal amount of the loan.
    - annual_rate (float): Annual interest rate (percentage).
    - years (int): Loan term in years.
    
    Returns:
    - float: Monthly mortgage payment.
    """
    monthly_rate = annual_rate / 12 / 100
    total_payments = years * 12
    if monthly_rate == 0:
        return principal / total_payments
    else:
        monthly_payment = principal * (monthly_rate * (1 + monthly_rate)**total_payments) / ((1 + monthly_rate)**total_payments - 1)
        return monthly_payment

def retirement_balance(initial_investment, annual_contribution, annual_rate, years_until_retirement):
    """
    Calculates the retirement account balance at the time of retirement.
    
    Args:
    - initial_investment (float): Initial investment amount.
    - annual_contribution (float): Annual contribution amount.
    - annual_rate (float): Annual interest rate (percentage).
    - years_until_retirement (int): Number of years until retirement.
    
    Returns:
    - float: Retirement account balance at retirement.
    """
    monthly_rate = annual_rate / 12 / 100
    total_months = years_until_retirement * 12
    future_value = initial_investment * (1 + monthly_rate)**total_months + \
                   annual_contribution * (((1 + monthly_rate)**total_months - 1) / monthly_rate)
    return future_value

def time_to_double(initial_value, annual_rate):
    """
    Calculates the time required for an investment to double.
    
    Args:
    - initial_value (float): Initial value of the investment.
    - annual_rate (float): Annual growth rate (percentage).
    
    Returns:
    - float: Number of years required for the investment to double.
    """
    if annual_rate <= 0:
        return float('inf')  # Investment will never double with zero or negative growth rate
    years_to_double = math.log(2) / math.log(1 + annual_rate / 100)
    return years_to_double

def rate_of_growth(initial_value, ending_value, years):
    """
    Calculates the annual growth rate given initial and ending values over a period of time.
    
    Args:
    - initial_value (float): Starting value of the investment.
    - ending_value (float): Ending value of the investment.
    - years (int): Number of years over which growth occurred.
    
    Returns:
    - float: Annual growth rate (percentage).
    """
    if initial_value == 0:
        return float('inf')  # Prevent division by zero
    growth_rate = (ending_value / initial_value)**(1 / years) - 1
    return growth_rate * 100

# Example usage:
if __name__ == "__main__":
    # Example for mortgage payment calculation
    principal = 300000
    annual_rate = 4.5
    years = 30
    monthly_payment = mortgage_payment(principal, annual_rate, years)
    print(f"Mortgage Payment: ${monthly_payment:.2f} per month")
    
    # Example for retirement account balance calculation
    initial_investment = 100000
    annual_contribution = 5000
    annual_rate = 6.0
    years_until_retirement = 30
    retirement_balance = retirement_balance(initial_investment, annual_contribution, annual_rate, years_until_retirement)
    print(f"Retirement Balance at Retirement: ${retirement_balance:.2f}")
    
    # Example for time required for money to double
    initial_value = 10000
    years_to_double = time_to_double(initial_value, annual_rate)
    print(f"Time to Double: {years_to_double:.2f} years")
    
    # Example for rate of growth calculation
    ending_value = 15000
    growth_rate = rate_of_growth(initial_value, ending_value, years)
    print(f"Rate of Growth: {growth_rate:.2f}% per year")
