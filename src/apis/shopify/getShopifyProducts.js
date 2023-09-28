const axios = require('axios')

module.exports = async function getShopifyProducts() {
  let data = JSON.stringify({
    query: `{
            products(first: 10) {
                edges {
                    node {
                        title
                    }
                }
            }
        }`,
    variables: {}
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/${process.env.SHOPIFY_GRAPHQL_API_ENDPOINT}`,
    headers: {
      'X-Shopify-Access-Token': process.env.SHOPIFY_API_ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    data: data
  };

  console.log('Getting Shopify products...');
  return await axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
