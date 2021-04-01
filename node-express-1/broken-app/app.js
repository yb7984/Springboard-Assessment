const express = require('express');
const axios = require('axios');
const app = express();
const ExpressError = require("./expressError")

app.use(express.json());

app.post('/', async function (req, res, next) {
  try {
    if (!req.body.developers){
      throw new ExpressError('developers is required' , 400);
    }

    const resps = req.body.developers.map(async d => {
      if (d.trim() === "") {
        return null;
      }

      try {
        return await axios.get(`https://api.github.com/users/${d}`);
      } catch (error) {
        if (error.response.status === 404){
          throw new ExpressError(`Can not find ${d}` , 404);
        }
        throw new ExpressError(`Error when getting data of ${d}`, 500);
      }
    });

    const results = await Promise.all(resps); //wait for all promise to solve
    const developers = results.map(r => (r ? { name: r.data.name, bio: r.data.bio } : {}));

    return res.json(developers);
  } catch (error) {
    next(error);
  }
});


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



app.listen(3000);
