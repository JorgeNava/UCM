import axios from 'axios';

export default async function getShopifyProducts() {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://www.grupocva.com/catalogo_clientes_xml/lista_precios.xml?cliente=73777',
        headers: { }
    };
    
    console.log('Getting CVA price list...');
    return await axios.request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
