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

    const AUTH_RESPONSE_SAMPLE = {
      "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODZkNTM5MmY1ZmYwZjQ5NTcwOTk5ZjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNDgzNTU5OTM0fQ.lHoLBCLDYiM6jmgnxTdj0v5GGB8jkpiJtZF2Obyh9X4",
      "time": "2022-02-28T19:12:47.378Z"
    }

    /* 
      return await axios.request(config)
        .then((response) => {
          console.log('[NAVA] response', response);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    */

    if (get(AUTH_RESPONSE_SAMPLE, 'errorCode', false)) {
      // TODO: HANDLE FALIED AUTHENTICATION.
      configProvider.set('suppliers.cti.enabled', false);
    }

    const apiAuthToken = get(AUTH_RESPONSE_SAMPLE, 'x-auth');
    this.config.headers['x-auth'] = apiAuthToken;
    return apiAuthToken;
  }

  async getProducts() {
    const config = structuredClone(this.config);
    config.method = 'get'
    config.url = `${config.baseUrl}/existencia/promociones`;
    delete config.baseUrl;

    const PRODUCT_RESPONSE_SAMPLE = [
      {
        "precio": 6.14,
        "moneda": "USD",
        "almacenes": [
          {
            "promocion": {
              "precio": 5.37,
              "vigente": {
                "ini": "2019-01-19T07:00:00.000Z",
                "fin": "2019-02-01T07:00:00.000Z"
              }
            },
            "14A": 2
          },
          {
            "promocion": {
              "precio": 5.37,
              "vigente": {
                "ini": "2019-01-19T07:00:00.000Z",
                "fin": "2019-02-01T07:00:00.000Z"
              }
            },
            "46A": 2
          }
        ],
        "codigo": "ACCBLC010"
      }
    ];
    /*     
      return await axios.request(config)
        .then((response) => {
          console.log('[NAVA] response', response);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        }); 
    */

    if (get(PRODUCT_RESPONSE_SAMPLE, 'errorCode', false)){
      // TODO: HANDLE FALIED AUTHENTICATION.
    }
    
    return PRODUCT_RESPONSE_SAMPLE;
  }

}
const ctiApi = new CtiAPI();


module.exports = {
  ctiApi
};
