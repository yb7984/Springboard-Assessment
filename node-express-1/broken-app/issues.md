# Broken App Issues
- pass err to the next which was not defined
  
Issue:
```js
catch {
    next(err);
}
```

Fixed:
```js
catch (err){
    next(err);
}
```

- Didn't tell Express to parse request bodies for JSON

Fixed:
```js
app.use(express.json());
```

- using let and var to declare axios and app, should use const

Issue:
```js
let axios = require('axios');
var app = express();
```

Fixed:
```js
const axios = require('axios');
const app = express();
```

- results just return a list of promises, no real values yet, should wait for all promises to be solved and use const to declare variable all the time.

Issue:
```js
app.post('/', function(req, res, next) {
  try {
    const resps = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    
    const results = await Promise.all(resps); //wait for all promise to solve
    const developers = results.map(r => ({ name: r.data.name, bio: r.data.bio }));
```

Fixed:
```js
app.post('/', async function(req, res, next) {
  try {
    const results = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    
    const resps = await Promise.all(results); //wait for all promise to solve
    const out = resps.map(r => ({ name: r.data.name, bio: r.data.bio }));
```



- Response content-type was text/html; charset=utf-8, should use res.json not res.send

Issue:
```js
    return res.send(JSON.stringify(developers));
```

Fixed:
```js
    return res.json(developers);
```

- no error handlers

Fixed:

```js
const ExpressError = require("./expressError")
```

```js

// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError)
});

// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
      error: { message, status }
  });
});

```

- Didn't check the post data, adding the check if there are developers posted, if the developers username is empty


- No error handler for retrieving data from github

Fixed
```js

      try {
        return await axios.get(`https://api.github.com/users/${d}`);
      } catch (error) {
        if (error.response.status === 404){
          throw new ExpressError(`Can not find ${d}` , 404);
        }
        throw new ExpressError(`Error when getting data of ${d}`, 500);
      }

```