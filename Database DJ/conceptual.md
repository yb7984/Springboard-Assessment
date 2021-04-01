### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?
  PostgreSQL is relationnal database management system.

- What is the difference between SQL and PostgreSQL?
  SQL is the language to be used to access relational database.
  PostgreSQL is the database management system with running the database.

- In `psql`, how do you connect to a database?
  \c databasename

- What is the difference between `HAVING` and `WHERE`?
  HAVING is used with group by, determining how to group the result.
  WHERE is the condition how to filter the result.

- What is the difference between an `INNER` and `OUTER` join?
  INNER JOIN only return the result both side meet the condition.
  OUTER JOIN return the result INNER JOIN return plus one or both side data of the JOIN that can't match the condition.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?
  LEFT OUTER return INNER JOIN data plus first table's data
  RIGHT OUTER return INNER JOIN data plus second table's data

- What is an ORM? What do they do?
  ORM is Object Relational Mapping.
  ORM Create table and table relations through programming language and handle the database transaction without writing any SQL

- What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`?
  Making requests with AJAX, data go directly to the client side. The API is exposed to the users.
  On the server side, data need to be render to HTML to get to the client side. The API is not exposed to the users. It would be more save if the API need authorization.

- What is CSRF? What is the purpose of the CSRF token?
  CSRF is cross site request forgery. It is trying to avoid cross site request for the website.

- What is the purpose of `form.hidden_tag()`?
  Render the hidden elements for the form like CSRF token field.