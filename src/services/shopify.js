const shopifyApi = require('../apis/shopify');

async function getProducts() {
  const RESPONSE = await shopifyApi.getProducts();
  return RESPONSE;
}

async function postProduct(newProduct) {
  const RESPONSE = await shopifyApi.postProduct(newProduct);
  return RESPONSE;
}

module.exports = {
  getProducts,
  postProduct,
};