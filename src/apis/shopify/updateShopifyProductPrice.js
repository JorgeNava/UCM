const axios = require('axios')

module.exports = async function updateShopifyProductPrice(productUpdate) {
    let data = {
        query: `mutation productVariantUpdate($input: ProductVariantInput!) {
            productVariantUpdate(input: $input) {
                product {
                    id
                    title
                    variants(first: 1) {
                        edges {
                            node {
                                id
                                title
                            }
                        }
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }`,
        variables: {
            input: productUpdate
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
    
    console.log('Updating Shopify product price');
    const resp = await axios.request(config);
    return resp?.data;
}
