const express = require('express');
const router = express.Router();

const CvaAdapter = require('../adapters/cva.js');
const configProvider = require('../lib/config-provider');
const ShopifyController = require('../controllers/shopify.js');
const { pullSupplierProducts } = require('../utils/pullSuppliers');

module.exports = function () {
  const shopifyConfig = configProvider.get('shopify');
  const cvaConfig = configProvider.get('suppliers.cva');

  router.post('/pullAllProducts', async (req, res) => {
    if (shopifyConfig?.enabled) {
      let newShopifyProducts = [];
      newShopifyProducts = await newShopifyProducts.concat(await pullSupplierProducts(cvaConfig, CvaAdapter));
      newShopifyProducts.forEach(async (newShopifyProduct) => {
        const rslt = await ShopifyController.postProduct(newShopifyProduct);
        // TODO: ENHANCE ERROR HANDLING
        if(rslt?.errors){
          console.log('[NAVA] Error when pushing productos', rslt.errors);
        }
      })
      console.log(`${newShopifyProducts.length} products posted succesfuly!`);
      res.json(newShopifyProducts);
    }
  });

  return router;
};