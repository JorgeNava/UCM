const express = require('express');
const router = express.Router();

const CvaAdapter = require('../adapters/cva.js');
const CtiAdapter = require('../adapters/cti.js');
const configProvider = require('../lib/config-provider');
const CvaController = require('../controllers/cva.js');
const CtiController = require('../controllers/cti.js');
const ShopifyController = require('../controllers/shopify.js');
const { pullSupplierProducts, writeObjectToJSONFile } = require('../utils');

module.exports = function () {
  const shopifyConfig = configProvider.get('shopify');
  const cvaConfig = configProvider.get('suppliers.cva');
  const ctiConfig = configProvider.get('suppliers.cti');

  router.post('/pullAllProducts', async (req, res) => {
    if (shopifyConfig?.enabled) {
      let newShopifyProducts = [];

      //const cvaProducts = await pullSupplierProducts(cvaConfig, CvaAdapter);
      const cvaProducts = null;

      if (cvaProducts) {
        newShopifyProducts.push(...cvaProducts);
      }

      const ctiProducts = await pullSupplierProducts(ctiConfig, CtiAdapter);
      if (ctiProducts) {
        newShopifyProducts.push(...ctiProducts);
      }

      newShopifyProducts.forEach(async (newShopifyProduct) => {
        /*    const rslt = await ShopifyController.postProduct(newShopifyProduct);
           // TODO: ENHANCE ERROR HANDLING
           if(rslt?.errors){
             console.log('[NAVA] Error when pushing productos', rslt.errors);
           } */
      })
      console.log(`${newShopifyProducts.length} products posted succesfuly!`);
      res.json(newShopifyProducts);
    }
  });

  router.get('/pullAllSku', async (req, res) => {
    const productsSku = {};

    const cvaProducts = await CvaController.getProducts();
    if (Array.isArray(cvaProducts)) {
      const cvaSKUs = cvaProducts.map((product) => {
        return product.codigo_fabricante[0];
      })
      productsSku.cva = {
        length: cvaSKUs.length,
        products: cvaSKUs
      }
    }

    const ctiProducts = await CtiController.getProducts();
    if (ctiProducts) {
      const ctiSKUs = ctiProducts.map((product) => {
        return product.codigo;
      })
      productsSku.cti = {
        length: ctiSKUs.length,
        products: ctiSKUs
      };
    }

    await writeObjectToJSONFile('productsSku', productsSku);
    res.json(productsSku);
  });

  return router;
};