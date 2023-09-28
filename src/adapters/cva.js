const CvaAPI = require('../apis/cva');
const ShopifyProduct = require('../models/shopify-product');

class CvaAdapter {
    constructor() {
        this.api = new CvaAPI();
    }

    async getProducts() {
        const data = await this.api.fetchProducts();
        return data.map(item => new ShopifyProduct(item.productID, item.productName, item.productPrice));
    }
}

module.exports = CvaAdapter;
