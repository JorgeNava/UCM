const CtiController = require('../controllers/cti.js');
const ShopifyProduct = require('../models/shopify-product.js');

class CtiAdapter {
  constructor() {
    this.config = {
      defaultDescription: ''
    }
  }

  async getProducts() {
    const data = await CtiController.getProducts();
    return data.map(item => new ShopifyProduct(item.codigo, this.config.defaultDescription));
  }
}

module.exports = CtiAdapter;
