const shopifyApi = require('../apis/shopify');

async function getProducts() {
  const RESPONSE = await shopifyApi.getProducts();
  return RESPONSE;
}

module.exports = {
  getProducts
};