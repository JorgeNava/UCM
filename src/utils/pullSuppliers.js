const configProvider = require('../lib/config-provider');

const pullExceptions = configProvider.get('features.pullExceptions');

function shouldPullSupplier(supplierConfig) {
  return supplierConfig?.enabled && !pullExceptions.includes(supplierConfig.id);
}

async function pullSupplierProducts(supplierConfig, Adapter) {
  if (shouldPullSupplier(supplierConfig)) {
    const supplier = new Adapter();
    return await supplier.getProducts();
  }
  return [];
}

module.exports = pullSupplierProducts;