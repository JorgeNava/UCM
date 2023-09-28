const axios = require('axios');

const configProvider = require('../../lib/config-provider');

const postShopifyProduct = require('./postShopifyProduct.js');
const updateShopifyProduct = require('./updateShopifyProduct.js');
const updateShopifyProductPrice = require('./updateShopifyProductPrice.js');
const deleteShopifyProduct = require('./deleteShopifyProduct.js');


class ShopifyApi {
  constructor() {
    const shopifyStoreDomain = configProvider.get('shopify.storeDomain');
    const shopifyGraphQlEndpoint = configProvider.get('shopify.api.graphql.endpoint');
    const shopifyApiAccessToken = configProvider.get('shopify.api.graphql.accesToken');

    this.config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://${shopifyStoreDomain}/admin/${shopifyGraphQlEndpoint}`,
      headers: {
        'X-Shopify-Access-Token': shopifyApiAccessToken,
        'Content-Type': 'application/json'
      }
    };
  }

  async getProducts(quantity = 10) {
    const config = this.config;
    config.data = JSON.stringify({
      query: `{
              products(first: ${quantity}) {
                  edges {
                      node {
                          title
                      }
                  }
              }
          }`,
      // TODO: MAYBE PUT ACTUAL VARIABLES HERE, MUST UPDATE QUERY
      variables: {}
    });

    console.log('Getting Shopify products...');
    return await axios.request(config)
      .then((response) => {
        console.log('[NAVA] response', response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  postProduct() {
    return postShopifyProduct(...arguments);
  }

  updateProduct() {
    return updateShopifyProduct(...arguments);
  }

  updateProductPrice() {
    return updateShopifyProductPrice(...arguments);
  }

  deleteProduct() {
    return deleteShopifyProduct(...arguments);
  }
}

const shopifyApi = new ShopifyApi();

module.exports = shopifyApi;
