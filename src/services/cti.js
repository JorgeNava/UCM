const { ctiApi } = require('../apis/cti');

(async function() {
  const autToken = await ctiApi.getAuthToken();
  if (autToken) {
    console.log('CTI API Connected...')
  }
})();

async function getAuthToken() {
  const RESPONSE = await ctiApi.getAuthToken();
  return RESPONSE;
}

async function getProducts() {
  const RESPONSE = await ctiApi.getProducts();
  return RESPONSE;
}

module.exports = {
  getProducts,
  getAuthToken
};