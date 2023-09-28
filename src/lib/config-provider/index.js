const fs = require('fs');
const path = require('path');

class ConfigProvider {
  constructor() {
    this.config = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/config/local.json'), 'utf8'));
  }

  // ADD ALL ENV VARIABLES HERE
  loadEnvVariables() {
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
