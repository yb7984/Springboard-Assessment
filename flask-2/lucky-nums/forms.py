from flask_wtf import FlaskForm
from wtforms import StringField, validators
from wtforms.validators import InputRequired, Email, Regexp, AnyOf 

COLOR_VALUES = ["red" , "green" , "orange" , "blue"]

class LuckyNumberForm(FlaskForm):
    """Form for getting lucky number"""

    name = StringField('Name' , validators=[InputRequired()])
    email = StringField('Email' , validators=[InputRequired(), Email()])
    year = StringField('Year' , validators=[InputRequired(), Regexp('^19\d\d$|^2000$' , message='This field must be a number between 1900 and 2000')])
    color = StringField('Color' , validators=[InputRequired() , AnyOf(COLOR_VALUES)])