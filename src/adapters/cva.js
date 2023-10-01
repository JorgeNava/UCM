const CvaController = require('../controllers/cva.js');
const ShopifyProduct = require('../models/shopify-product');
const _ = require('lodash');
const parseXML = require('../utils/parseXML.js');
const SAMPLE_DATA = require('../utils/cvaProductsSample.json');

function isNullOrEmptyOrEscapeCharsOnly(str) {
  // Check if null or undefined
  if (_.isNull(str) || _.isUndefined(str)) {
      return true;
  }

  // Check if it's an empty string or only consists of white spaces
  if (_.trim(str) === "") {
      return true;
  }

  // Check if the string contains only escape characters (e.g. '\r', '\n', '\t', etc.)
  const escapeCharsRegex = /^[\r\n\t\f\v ]*$/; 
  return escapeCharsRegex.test(str);
}

class CvaAdapter {
  constructor() {
  }

  async getProducts() {
    //! const data = await CvaController.getProducts(); waiting to have data from API
    const data = SAMPLE_DATA;
    if (!isNullOrEmptyOrEscapeCharsOnly(data)) {
      // TODO: const jsonData = await parseXML(xmlData); waiting to have data from API
      return data.articulos.item.map(item => new ShopifyProduct(item.clave, item.descripcion));
    }
    return [];
  }
}

module.exports = CvaAdapter;
