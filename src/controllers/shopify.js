const shopifyService = require('../services/shopify.js');

async function getProducts() {
  return await shopifyService.getProducts();
}

async function postProduct(newProduct) {
  return await shopifyService.postProduct(newProduct);
}

module.exports = {
  getProducts,
  postProduct,
};