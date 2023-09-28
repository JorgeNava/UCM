const axios = require('axios')

module.exports = async function postShopifyProduct(productInput) {
    let data = {
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
            input: productInput
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
    
    console.log('Creating Shopify product');
    const resp = await axios.request(config);
    return resp?.data;
}
