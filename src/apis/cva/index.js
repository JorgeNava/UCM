const axios = require('axios');

const {
  BY_BRANCH,
  BY_DISTRIBUTION_CENTER,
  BY_BRANCH_AND_DISTRIBUTION_CENTER,
  BY_BRANCH_OR_DISTRIBUTION_CENTER
} = require('./constants.js');

const configProvider = require('../../lib/config-provider/index.js');
/*
  # CVA API - https://www.grupocva.com/api/docs/documentationWebService.html#CONSULTAS
  You can determine if you want the XML service to show the complete catalog of products or only the products that are in stock in your warehouse (this warehouse is the one that corresponds to the branch where you registered) or the distribution center of your warehouse, by default the service will show all the elements.
  The parameter that controls the behavior of the filter is exist and is used as follows:

  exist=1 shows what you have available in the branch(sucursal) (independent of the distribution center).
  exist=2 shows what you have available in the distribution center (independent of the branch(sucursal)).
  exist=3 shows what you have available at the branch(sucursal) and distribution center.
  exist=4 shows what is available in the branch(sucursal) or distribution center.
*/

class CvaAPI {
  constructor() {
    // TODO: MAKE THIS MORE FLEXIBLE
    this.config = {
      method: 'get',
      maxBodyLength: Infinity,
      baseUrl: `http://www.grupocva.com/catalogo_clientes_xml`,
      headers: {}
    };
  }

  async getExistantProducts(exist = 1) {
    console.log('Getting CVA price list...');
    
    const cvaClientId = configProvider.get('suppliers.cva.api.clientId');
    const config = structuredClone(this.config);

    config.url = config.baseUrl + `/lista_precios.xml?cliente=${cvaClientId}&exist=${exist}`;
    delete config.baseUrl;

    return await axios.request(config)
      .then((response) => {
        console.log('[NAVA] response', response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
const cvaApi = new CvaAPI();

module.exports = {
  cvaApi,
  BY_BRANCH,
  BY_DISTRIBUTION_CENTER,
  BY_BRANCH_AND_DISTRIBUTION_CENTER,
  BY_BRANCH_OR_DISTRIBUTION_CENTER
};
