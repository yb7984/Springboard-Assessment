from unittest import TestCase
from app import app
from flask import Markup
from currency import *
import json


app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):
    """Test class for Currency converter app"""
    def test_show_index(self):
        """Testing the main page"""
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<title>Currency Converter</title>', html)

            
    def test_show_rate(self):
        """Testing the show rate page"""

        with app.test_client() as client:
            # Test the successful request
            res = client.post('/' , data = {
                "from": "USD" ,
                "to": "USD" ,
                "amount":100
                })
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('US$100.0', html)

            # Test the error request
            res = client.post("/" , data = {
                "from":"USD",
                "to":"ABC" ,
                "amount": "abc"
            })
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Not a valid code: ABC', html)
            self.assertIn('Not a valid amount', html)