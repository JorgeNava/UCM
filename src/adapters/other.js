const OtherAPI = require('../apis/other');
const parseXML = require('../utils/parseXML.js');
const ShopifyProduct = require('../models/shopify-product');

class OtherAdapter {
    constructor() {
        this.api = new OtherAPI();
    }

    async getProducts() {
        const xmlData = await this.api.fetchProducts();
        const jsonData = await parseXML(xmlData);
        
        return jsonData.products.product.map(item => {
            return new ShopifyProduct(item.id[0], item.title[0], parseFloat(item.cost[0]));
        });
    }
}

module.exports = OtherAdapter;
