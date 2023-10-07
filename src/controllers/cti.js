const { get } = require('lodash');
const ctiService = require('../services/cti.js');

async function getAuthToken() {
  return await ctiService.getAuthToken();
}

async function getProducts() {
  return await ctiService.getProducts();
}

module.exports = {
  getProducts,
  getAuthToken
};