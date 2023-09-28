const axios = require('axios')

module.exports = async function deleteShopifyProduct(productId) {
    let data = {
        query: `mutation productDelete($input: ProductDeleteInput!) {
            productDelete(input: $input) {
                deletedProductId
                userErrors {
                    field
                    message
                }
            }
        }`,
        variables: {
            input: productId
        }
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/${process.env.SHOPIFY_GRAPHQL_API_ENDPOINT}`,
        headers: { 
            'X-Shopify-Access-Token': process.env.SHOPIFY_API_ACCESS_TOKEN, 
            'Content-Type': 'application/json', 
            'Cookie': 'request_method=POST'
        },
        data : data
    };
    
    console.log('Deleting Shopify product');
    const resp = await axios.request(config);
    return resp?.data;
}
