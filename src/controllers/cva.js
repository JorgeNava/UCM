const cvaService = require('../services/cva.js');

async function getProducts() {
  return await cvaService.getProducts();
}

module.exports = {
  getProducts
};