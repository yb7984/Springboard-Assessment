from flask import Flask, render_template, request, jsonify
import requests
from forms import COLOR_VALUES, LuckyNumberForm

app = Flask(__name__)

app.config['SECRET_KEY'] = 'soso'
BASE_API_URL = 'http://numbersapi.com'


@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")

@app.route("/api/get-lucky-num" , methods=["POST"])
def get_lucky_num():
    """
    Users provide some data about themselves, and receive a lucky number and fact

    This route needs a JSON body with the following information:

    name: name of user (required)
    email: email of user (required)
    year: birth year (required, must be between 1900 and 2000, inclusive)
    color: their favorite color (required and must be one of “red”, “green”, “orange”, “blue”)
    This route should return JSON.

    If the user failed to provide valid data for all fields, this should return JSON like this:
    {
        "errors": {
            "color": [
            "Invalid value, must be one of: red, green, orange, blue."
            ],
            "name": [
            "This field is required."
            ]
        }
    }
    If they provided valid data, they should get a response like this:

    {
        "num": {
            "fact": "67 is the number of throws in Judo.",
            "num": 67
        },
        "year": {
            "fact": "1950 is the year that nothing remarkable happened.",
            "year": "1950"
        }
    }
    The lucky number should be a random number from 1-100 (inclusive).
    The random facts for the number and the year should come from the numbersapi API: http://numbersapi.com/
    
    """

    # errors = {
    #     "name":[] ,
    #     "email":[] ,
    #     "year":[] ,
    #     "color":[]
    # }
    # name = request.json.get('name' , '')
    # email = request.json.get('email' , '')
    # year  = request.json.get('year' , None)
    # color = request.json.get('color' , '')


    # if len(name.strip()) == 0:
    #     errors["name"].append("This field is required.")

    # if len(email.strip()) == 0:
    #     errors["email"].append("This field is required.")


    # if year is None:
    #     errors["year"].append("This field is required.")
    # else:
    #     try:
    #         int_year = int(year)
    #         if int_year > 2000 or int_year < 1900:
    #             errors["year"].append("Invalid value. Must between 1900 and 2000.")
    #     except ValueError:
    #         errors['year'].append("This field must be an integer number")
    
    # if len(color.strip()) == 0:
    #     errors["color"].append("This field is required.")

    # if color not in COLOR_VALUES:
    #     errors["color"].append(f'This field must be one of {", ".join(COLOR_VALUES)}')

    # for key,val in errors.items():
    #     if len(val) > 0:
    #         #there is some errors, return error information
    #         return jsonify({"errors" : errors})

    form = LuckyNumberForm(csrf_enabled=False)

    if not form.validate():
        #there is some error
        return jsonify({"errors" : form.errors})

    name = form.name.data
    email = form.email.data 
    year = form.year.data
    color = form.color.data 


    #luck number
    lucky_number = get_random_number_story()

    #year
    year_fact = get_number_story(str=str(year) , data_type="year")


    return jsonify({"num": lucky_number , "year" : year_fact})

def get_random_number_story(min=1 , max=100):
    """Put in the min and max number and return a random number and its story"""

    url = f'{BASE_API_URL}/random?min={min}&max={max}'

    headers = {"Content-Type":"application/json"}
    data = requests.get(url , headers=headers).json()

    story = {}
    story["fact"] = data["text"]
    story["num"] = data["number"]
    
    return story


def get_number_story(str="random" , data_type="num"):
    """Put in a string of number and return meaning of the number"""

    if data_type == "num":
        url = BASE_API_URL + f'/{str}'
    else:
        url = BASE_API_URL + f'/{str}/{data_type}'

    headers = {"Content-Type":"application/json"}
    data = requests.get(url , headers=headers).json()

    story = {}
    story["fact"] = data["text"]
    story[data_type] = data["number"]
    
    return story