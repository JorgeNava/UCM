require('dotenv').config();
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
    
    this.config.suppliers.cti.api.url = process.env.CTI_API_URL || this.config.suppliers.cti.api.url;
    this.config.suppliers.cti.api.email = process.env.CTI_API_EMAIL || this.config.suppliers.cti.api.email;
    this.config.suppliers.cti.api.clientId = process.env.CTI_API_CLIENT_ID || this.config.suppliers.cti.api.clientId;
    this.config.suppliers.cti.api.rfc = process.env.CTI_API_RFC || this.config.suppliers.cti.api.rfc;
  }

  get(key) {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), this.config);
  }

  getConfig(){
    return this.config;
  }

  set(key, value) {
    const keys = key.split('.');
    keys.reduce((o, k, i) => {
      if (i === keys.length - 1) {
        o[k] = value;
        return o[k];
      }
      if (!o[k]) o[k] = {}; // If the property doesn't exist, create it as an empty object.
      return o[k];
    }, this.config);
  }
  
}

const provider = new ConfigProvider();

provider.loadEnvVariables();

module.exports = provider;