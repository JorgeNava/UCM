const express = require('express');
const bodyParser = require('body-parser');

const configProvider = require('./lib/config-provider');
const { pullSupplierProducts } = require('./utils/pullSuppliers');
const CvaAdapter = require('./adapters/cva.js');
const OtherAdapter = require('./adapters/other.js');

const cvaRouter = require('./routes/cva.js');
const shopifyRouter = require('./routes/shopify.js');

module.exports = function () {
  const app = express();

  app.use(bodyParser.json());

  const shopifyConfig = configProvider.get('shopify');
  const cvaConfig = configProvider.get('suppliers.cva');
  const otherConfig = configProvider.get('suppliers.other');

  if (shopifyConfig?.enabled) {
    app.use('/shopify', shopifyRouter());
  }

  if (cvaConfig?.enabled) {
    app.use('/cva', cvaRouter());
  }

  app.get('/pullAllProducts', async (req, res) => {
    const cvaProducts = await pullSupplierProducts(cvaConfig, CvaAdapter);
    const otherProducts = await pullSupplierProducts(otherConfig, OtherAdapter);
    // TODO: MAKE ACTUAL PUSH OF PRODUCTS INTO SHOPIFY
    res.json([...cvaProducts, ...otherProducts]);
  });

  return app;
}
