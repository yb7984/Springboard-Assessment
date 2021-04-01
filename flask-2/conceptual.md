### Conceptual Exercise

Answer the following questions below:

- What is RESTful routing?
  
  RESETful routing is like this, using users for example:
    1. List GET /users
    2. One user GET /users/<int: user_id>
    3. Add new POST /users/
    4. Update PUT/PATCH /users/<int:user_id>
    5. Delete DELETE /users/<int:user_id> 


- What is a resource?
  
  resource is the path get to the API url after the base url.

  http://domain.com/api/users is the api url, /api/users would be the resource


- When building a JSON API why do you not include routes to render a form that when submitted creates a new user?

  The API would just handle how to validate the data and update the database. the client would be render with client not in the api. This would be the API more flexible.


- What does idempotent mean? Which HTTP verbs are idempotent?
  
  Idempotent is no matter how many time you request, it will return the same result.

  Idempotent HTTP verbs are GET, PUT, PATCH, DELETE


- What is the difference between PUT and PATCH?
  
  PUT update the whole thing

  PATCH just update some part of it


- What is one way encryption?s
  
  One way encryption mean it is impossible to reverse the encryption.


- What is the purpose of a `salt` when hashing a password?

  `salt` is ramdon key word for hashing, which make it more a lot more harder to reverse the password.

- What is the purpose of the Bcrypt module?
  
  The purpose is make it slow and hard to find out what the password is.


- What is the difference between authorization and authentication?

  Authorization means user put in their information apply to some access. Like register a user on a website.

  Authentication means user put int their information to get verified and get the access. Like login on a website.
