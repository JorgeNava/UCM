const express = require('express');
const bodyParser = require('body-parser');

const configProvider = require('./lib/config-provider');

const ucmRouter = require('./routes/ucm.js');
const cvaRouter = require('./routes/cva.js');
const shopifyRouter = require('./routes/shopify.js');

module.exports = function () {
  const app = express();

  app.use(bodyParser.json());

  const shopifyConfig = configProvider.get('shopify');
  const cvaConfig = configProvider.get('suppliers.cva');

  if (shopifyConfig?.enabled) {
    app.use('/shopify', shopifyRouter());
  }

  if (cvaConfig?.enabled) {
    app.use('/cva', cvaRouter());
  }

  app.use('/ucm', ucmRouter());

  return app;
}
