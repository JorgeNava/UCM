const fs = require('fs');
const path = require('path');

class ConfigProvider {
  constructor() {
    this.config = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/config/local.json'), 'utf8'));
  }

  loadEnvVariables() {
    this.config.shopify.storeDomain = process.env.SHOPIFY_STORE_DOMAIN || this.config.shopify.storeDomain;
    this.config.shopify.api.graphql.endpoint = process.env.SHOPIFY_GRAPHQL_ENDPOINT || this.config.shopify.api.graphql.endpoint;
    this.config.shopify.api.graphql.accesToken = process.env.SHOPIFY_API_ACCESS_TOKEN || this.config.shopify.api.graphql.accesToken;

    this.config.suppliers.cva.api.url = process.env.CVA_API_URL || this.config.suppliers.cva.api.url;
  }

  get(key) {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), this.config);
  }
  
  getConfig(){
    return this.config;
  }
}

const provider = new ConfigProvider();

provider.loadEnvVariables();

module.exports = provider;