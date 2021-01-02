from flask import Flask, request, render_template, flash
from flask_debugtoolbar import DebugToolbarExtension
from currency import *

app = Flask(__name__)
app.config["SECRET_KEY"] = "so-so"

debug = DebugToolbarExtension(app)

@app.route("/")
def show_index():
    """Show the form for input"""
    return render_template("index.html")


@app.route("/", methods=["POST"])
def show_rate():
    """Get the exchange rate and show"""
    c_from = request.form.get("from" , "").upper()
    c_to = request.form.get("to" , "").upper()
    c_amount = request.form.get("amount" , 0)

    is_error = False

    if not check_code(c_from):
        flash(f"Not a valid code: {c_from}")
        is_error = True
    if not check_code(c_to):
        flash(f"Not a valid code: {c_to}")
        is_error = True

    try:
        amount = int(c_amount)

        if amount <= 0:
            flash("Not a valid amount")
            is_error = True
    except ValueError:
        flash("Not a valid amount")
        is_error = True

    if is_error:
        return render_template("index.html" , c_from=c_from , c_to=c_to , c_amount=c_amount)

    result = convert(c_from , c_to , amount)
    symbol = get_symbol(c_to)

    return render_template(
        "index.html" , 
        c_from=c_from , 
        c_to=c_to , 
        c_amount=c_amount , 
        result=result , 
        symbol=symbol)
