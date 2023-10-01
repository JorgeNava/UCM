const express = require('express');
const router = express.Router();

const ShopifyController = require('../controllers/shopify.js');

module.exports = function () {
  router.get('/products', async (req, res) => {
    const RET_VAL = await ShopifyController.getProducts();
    res.send(RET_VAL);
  });

  router.post('/product', async (req, res) => {
    const RET_VAL = await ShopifyController.postProduct();
    res.send(RET_VAL);
  });
  
  return router;
};