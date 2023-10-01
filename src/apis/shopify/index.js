const axios = require('axios');

const configProvider = require('../../lib/config-provider');

const postShopifyProduct = require('./postShopifyProduct.js');
const updateShopifyProduct = require('./updateShopifyProduct.js');
const updateShopifyProductPrice = require('./updateShopifyProductPrice.js');
const deleteShopifyProduct = require('./deleteShopifyProduct.js');


class ShopifyApi {
  constructor() {
    const shopifyGraphQlEndpoint = configProvider.get('shopify.api.graphql.endpoint');
    const shopifyApiAccessToken = configProvider.get('shopify.api.graphql.accesToken');

    this.config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: shopifyGraphQlEndpoint,
      headers: {
        'X-Shopify-Access-Token': shopifyApiAccessToken,
        'Content-Type': 'application/json'
      }
    };
  }

  async getProducts(quantity = 10) {
    const config = structuredClone(this.config);
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
    });

    console.log('Getting Shopify products...');
    return await axios.request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async postProduct(newProduct) {
    const config = structuredClone(this.config);
    config.data = {
      query: `mutation productCreate($input: ProductInput!) {
          productCreate(input: $input) {
              product {
                  id
                  title
                  descriptionHtml
              }
              userErrors {
                  field
                  message
              }
          }
      }`,
      variables: {
        input: newProduct
      }
    };
    config.headers['Cookie'] = 'request_method=POST';
    console.log('Posting Shopify product...');
    return await axios.request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async updateProduct() {
    return updateShopifyProduct(...arguments);
  }

  async updateProductPrice() {
    return updateShopifyProductPrice(...arguments);
  }

  async deleteProduct() {
    return deleteShopifyProduct(...arguments);
  }
}

const shopifyApi = new ShopifyApi();

module.exports = shopifyApi;
