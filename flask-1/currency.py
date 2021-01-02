"""
Methods for currency convertions
"""
from forex_python.converter import CurrencyRates,CurrencyCodes

def convert(c_from , c_to , amount):
    """
    Convert the amount
        >>> convert("USD" , "USD" , 100) 
        100.0
    """
    c = CurrencyRates()
    return c.convert(c_from , c_to , amount)

def check_code(code):
    """
    Check if the currency code exist
        >>> check_code("USD") 
        True

        >>> check_code("ABC") 
        False
    """
    return get_symbol(code) is not None

def get_symbol(code):
    """
    Get the symbol of currency code
        >>> get_symbol("USD") 
        'US$'

        >>> get_symbol("ABC")
        
    """
    c = CurrencyCodes()
    return c.get_symbol(code)