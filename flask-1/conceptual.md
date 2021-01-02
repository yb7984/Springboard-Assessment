### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?
  python use indent for block javascript using brackets

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.
  dict.get("c")
  dict["c"] if "c" in dict.keys() else None

- What is a unit test?
  Testing single method of the program

- What is an integration test?
  Put the programing together and test the whole program to make sure all parts work together correctly 

- What is the role of web application framework, like Flask?
  Like a library. Making the developing easiler. It is the connection between app and basic language.

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?
  if the information is like the subject of the page using route URL. 
  if it is like extra information using query param


- How do you collect data from a URL placeholder parameter using Flask?
  @app("/path/<param>")
  def method_name(param)

  define it in the route and then pass it as param in the method


- How do you collect data from the query string using Flask?
  request.args["query"] or request.args.get("query")

- How do you collect data from the body of the request using Flask?
  request.form
  request.json
  request.args
  request.data

- What is a cookie and what kinds of things are they commonly used for?
  cookie is some short information store in client side. It is sent to the server every request.
  some state information need to remember and send to the server side. 

- What is the session object in Flask?

- What does Flask's `jsonify()` do?
  turn a JSON output into a response object with application/json mimetype
