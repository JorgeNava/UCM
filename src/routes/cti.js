const express = require('express');
const router = express.Router();

const CtiController = require('../controllers/cti.js');

module.exports = function () {
  router.get('/refreshAuthToken', async (req, res) => {
    const RET_VAL = await CtiController.getAuthToken();
    res.send(RET_VAL);
  });

  router.get('/products', async (req, res) => {
    const RET_VAL = await CtiController.getProducts();
    res.send(RET_VAL);
  });
  
  return router;
};