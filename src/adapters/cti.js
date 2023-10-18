const CtiController = require('../controllers/cti.js');
const ShopifyProduct = require('../models/shopify-product.js');

class CtiAdapter {
  constructor() {
    this.config = {
      defaultDescription: ''
    }
  }

  async getProducts() {
    let data = await CtiController.getProducts();
    
    data = [data[0]];

    return data.map(item => {
      // TODO: HANDLE CORRECTLY DEFAULT VALUES
      new ShopifyProduct(item.codigo, this.config.defaultDescription)
    });
  }
}

module.exports = CtiAdapter;
