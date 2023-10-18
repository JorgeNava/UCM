const { 
  cvaApi,
  BY_BRANCH_OR_DISTRIBUTION_CENTER
} = require('../apis/cva');

const { parseXML } = require('../utils');

async function getProducts() {
  const RESPONSE = await cvaApi.getExistantProducts(BY_BRANCH_OR_DISTRIBUTION_CENTER);
  if (RESPONSE.error) return RESPONSE;
  const productsJson = await parseXML(RESPONSE);
  return productsJson.articulos.item;
}

module.exports = {
  getProducts
};