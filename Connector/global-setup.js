// global-setup.js

const xlsx = require('xlsx');

module.exports = async () => {
  global.xlsx = xlsx; // Setting xlsx globally
};
