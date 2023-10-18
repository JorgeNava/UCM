const axios = require('axios');
const { get } = require('lodash');

const configProvider = require('../../lib/config-provider/index.js');

class CtiAPI {
  constructor() {
    // TODO: MAKE THIS MORE FLXIBLE - MAYBE CREATE BASE AXIOS REQUEST CONFIG ?
    const ctiBaseUrl = configProvider.get('suppliers.cti.api.url');
    this.config = {
      method: 'post',
      maxBodyLength: Infinity,
      baseUrl: ctiBaseUrl,
      headers: {
        'Content-Type': 'application/json'
      },
    };
  }

  async getAuthToken() {
    console.log('Getting CTI Auth Token...');
    const ctiApiConfig = configProvider.get('suppliers.cti.api');
    const authEmail = get(ctiApiConfig, 'email');
    const authClientId = get(ctiApiConfig, 'clientId');
    const authRfc = get(ctiApiConfig, 'rfc');

    const config = structuredClone(this.config);
    config.url = `${config.baseUrl}/cliente/token`;
    delete config.baseUrl;
    config.data = {
      "email": authEmail,
      "cliente": authClientId,
      "rfc": authRfc
    }

    const response = await axios.request(config);

    if (get(response, 'errorCode', false)) {
      // TODO: HANDLE FALIED AUTHENTICATION.
      console.log('[ERROR] While getting CTI auth token', response.errorCode);
      configProvider.set('suppliers.cti.enabled', false);
    }

    const apiAuthToken = get(response, 'data.token');
    this.config.headers['x-auth'] = apiAuthToken;
    return apiAuthToken;
  }

  async getProducts() {
    const config = structuredClone(this.config);
    config.method = 'get'
    config.url = `${config.baseUrl}/existencia/promociones`;
    delete config.baseUrl;

    const response = await axios.request(config);

    if (get(response, 'errorCode', false)){
      // TODO: HANDLE FALIED AUTHENTICATION.
    }

    const products = response.data;
    return products;
  }

}
const ctiApi = new CtiAPI();


module.exports = {
  ctiApi
};
