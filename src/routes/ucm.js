const express = require('express');
const router = express.Router();

const CvaAdapter = require('../adapters/cva.js');
const CtiAdapter = require('../adapters/cti.js');
const configProvider = require('../lib/config-provider');
const ShopifyController = require('../controllers/shopify.js');
const { pullSupplierProducts } = require('../utils/pullSuppliers');

module.exports = function () {
  const shopifyConfig = configProvider.get('shopify');
  const cvaConfig = configProvider.get('suppliers.cva');
  const ctiConfig = configProvider.get('suppliers.cti');

  router.post('/pullAllProducts', async (req, res) => {
    if (shopifyConfig?.enabled) {
      let newShopifyProducts = [];
      
      const cvaProducts = await pullSupplierProducts(cvaConfig, CvaAdapter);
      if (cvaProducts) {
        newShopifyProducts.push(...cvaProducts);
      }
      
      const ctiProducts = await pullSupplierProducts(ctiConfig, CtiAdapter);
      if (ctiProducts) {
        newShopifyProducts.push(...ctiProducts);
      }

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