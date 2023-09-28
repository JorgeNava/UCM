const express = require('express');
const router = express.Router();

const CvaController = require('../controllers/cva.js');

module.exports = function () {
  router.get('/products', async (req, res) => {
    const RET_VAL = await CvaController.getProducts();
    res.send(RET_VAL);
  });
  
  return router;
};