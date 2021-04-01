### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

 1. call back
 2. promise
 3. async function

- What is a Promise?
  
  Promise is one time guranteed future value

- What are the differences between an async function and a regular function?
  
  If you call a async function without await key word, it would return a promise, the lines of code will run right after before the promise return a real value.

  only inside the async function can use await key word which will pause the run of code and wait for the promise to return a real value;

- What is the difference between Node.js and Express.js?

  Express.js run on the Node.js. Node.js let us run javascript without the browser, it is something like python. Express.js is something like flask in python, it is framework to help building a web server.

- What is the error-first callback pattern?

  Error-first callback is to pass error and data to a function. the error is always the first argument of the function.


- What is middleware?

  middleware is the code run between the request and response cycle.

- What does the `next` function do?

  when invoked, excute the middleware succeeding the current middleware.

- What does `RETURNING` do in SQL? When would you use it?

  'RETURNING' help to return the columns values those were modified by insert and update, without it you will have to use select to return them.

  it help to save another trip to database.

  I would use it when insert new row of data and return the key value and update rows of data with certain search params and return all the key of the updated rows.


- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

  It would be slow, because every request need to wait for previous request to complete first.  we should let them start at the same time.
  
  Most part of the url are the same except the user name. it is no need to duplicate them 3 time. we should use baseUrl variable to store it.
