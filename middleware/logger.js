'use strict';

module.exports = (req, res, next) => {
  console.log('Ive been logged');
  next()
}
