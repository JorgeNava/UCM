const express = require('express');
const bodyParser = require('body-parser');

const configProvider = require('./lib/config-provider');
const { pullSupplierProducts } = require('./utils/pullSuppliers');
const CvaAdapter = require('./adapters/cva.js');
const OtherAdapter = require('./adapters/other.js');

//const cvaRouter = require('./routes/cvaRoutes.js');

module.exports = function () {
  const app = express();

  app.use(bodyParser.json());

  // TODO: DEFINE ROUTERS/CONTROLLERS/SERVICES CORRECTLY
  // if (cvaConfig?.enabled) {
  //   app.use('/cva', cvaRouter(database, api));
  // }

  const cvaConfig = configProvider.get('suppliers.cva');
  const otherConfig = configProvider.get('suppliers.other');

  app.get('/pullAllProducts', async (req, res) => {
    const cvaProducts = await pullSupplierProducts(cvaConfig, CvaAdapter);
    const otherProducts = await pullSupplierProducts(otherConfig, OtherAdapter);
    // TODO: MAKE ACTUAL PUSH OF PRODUCTS INTO SHOPIFY
    res.json([...cvaProducts, ...otherProducts]);
  });

  return app;
}
