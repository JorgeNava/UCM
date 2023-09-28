const shopifyService = require('../services/shopify.js');

async function getProducts() {
  return await shopifyService.getProducts();
}

module.exports = {
  getProducts
};