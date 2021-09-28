'use strict';

const express = require('express');
const app = express();

const notFoundHandlers = require('./handlers/404.js');
const errorHandler = require('./handlers/500.js');
const stamper = require('./middleware/stamper.js');
// const logger = require('./middleware/logger.js');



// Create Routes
app.get('/', stamper, (req, res) => {
  res.status(200).send('Hello World')
})

app.get('/bad', (req, res, next) => {
  throw new Error('Bad Error here')
  next()
})

app.get('/data', stamper, (req, res) => {
  let outputObject = {
    10: "even",
    5: "odd",
    action: "Give Kitties a reward",
  }
  res.status(200).json(outputObject);
})


// Use Handlers
app.use('*', notFoundHandlers);
// app.use(errorHandler);
// app.use(logger);

// Create start function

function start(port) {
  app.listen(port, () => console.log(`Port listening on ${port}`))
}

// start(3000);

module.exports = {
  app: app,
  start: start
}
