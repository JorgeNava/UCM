const { 
  cvaApi,
  BY_BRANCH_OR_DISTRIBUTION_CENTER
} = require('../apis/cva');

async function getProducts() {
  const RESPONSE = await cvaApi.getExistantProducts(BY_BRANCH_OR_DISTRIBUTION_CENTER);
  return RESPONSE;
}

module.exports = {
  getProducts
};