def add_time(start, duration, start_day=None):
    # Parse start time
    start_time, period = start.split()
    start_hour, start_minute = map(int, start_time.split(':'))
    
    # Parse duration
    duration_hour, duration_minute = map(int, duration.split(':'))
    
    # Convert start time to 24-hour format
    if period == 'PM':
        start_hour += 12 if start_hour != 12 else 0
    
    # Add duration
    end_hour = start_hour + duration_hour
    end_minute = start_minute + duration_minute
    
    # Handle overflow in minutes
    if end_minute >= 60:
        end_hour += 1
        end_minute -= 60
    
    # Calculate days and final hour
    days_later = end_hour // 24
    final_hour = end_hour % 24
    
    # Determine period (AM/PM) and format hour
    if final_hour < 12:
        period = 'AM'
        if final_hour == 0:
            final_hour = 12
    else:
        period = 'PM'
        if final_hour > 12:
            final_hour -= 12
    
    # Determine day of the week
    days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    if start_day:
        start_day = start_day.capitalize()
        start_index = days_of_week.index(start_day)
        end_index = (start_index + days_later) % 7
        end_day = days_of_week[end_index]
    
    # Build the result string
    result = f"{final_hour}:{end_minute:02} {period}"
    if start_day:
        result += f", {end_day}"
    if days_later == 1:
        result += " (next day)"
    elif days_later > 1:
        result += f" ({days_later} days later)"
    
    return result
