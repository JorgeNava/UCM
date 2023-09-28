import {
  getExistantProducts,
  BY_BRANCH,
  BY_DISTRIBUTION_CENTER,
  BY_BRANCH_AND_DISTRIBUTION_CENTER,
  BY_BRANCH_OR_DISTRIBUTION_CENTER
} from '../lib/cva/index.js';
import {
  getShopifyProducts,
  postShopifyProduct,
  updateShopifyProduct,
  updateShopifyProductPrice,
  deleteShopifyProduct
} from '../lib/shopify-api/index.js';

import convertXmlStringToJson from '../utils/convertXmlStringToJson.js';
//import sample from './utils/cvaProductsSample.json' assert { type: 'json' };

const cvaProdcutToShopifyProduct = (cvaProduct) => {
  const MAPPED_OBJECT = {
    descriptionHtml: `<p>${cvaProduct.descripcion}</p>`,
    images: [
      {
        src: cvaProduct.imagen
      }
    ],
    productType: cvaProduct.principal,
    title: cvaProduct.principal,
    vendor: cvaProduct.marca,
    //'id': cvaProduct.clave || cvaProduct.codigo_fabricante,
    variants: [
      {
        price: cvaProduct.precio
      }
    ]
  };
  return MAPPED_OBJECT;
};

const copyCvaProductsOnShopify = async () => {
  // * GET CVA PRODUCTS
  const XML_CVA_PRODUCTS = await getExistantProducts(BY_BRANCH_OR_DISTRIBUTION_CENTER);
  console.log('[NAVA] XML_CVA_PRODUCTS', XML_CVA_PRODUCTS);
  const CVA_PRODUCTS = await convertXmlStringToJson(XML_CVA_PRODUCTS);
  console.log('[NAVA] CVA_PRODUCTS', CVA_PRODUCTS);
  //const CVA_PRODUCTS = sample.articulos.item;

  // * GET SHOPIFY PRODUCTS
  //const SHOPIFY_RESPONSE = await getShopifyProducts();
  //const SHOPIFY_PRODUCTS = SHOPIFY_RESPONSE?.data?.products?.edges;
  //console.log('[NAVA] SHOPIFY_PRODUCTS', SHOPIFY_PRODUCTS);

  // * PROCESS SUPPLIERS PRODUCTS DATA INTO SHOPOIFY PRODUCTS
  //? que clase de preprocesamiento de datos se hara?
  //? cuales seran los filtros de los productos (existencia, disponibilidad en sucursales, departamento, categoria)
  //? como manejaremos la diferencia de datos/campos de los productos a traves de los diversos API de proveedores?
/*   const CVA_PRODUCT = CVA_PRODUCTS[0];
  const NEW_SHOPIFY_PRODUCT = cvaProdcutToShopifyProduct(CVA_PRODUCT);
  console.log('[NAVA] NEW_SHOPIFY_PRODUCT', NEW_SHOPIFY_PRODUCT); */

  // * UPLOAD PRODUCT TO SHOPIFY
/*   let resp = await postShopifyProduct(NEW_SHOPIFY_PRODUCT);
  const CREATED_PRODUCT = resp?.data?.productCreate?.product;
  console.log('[NAVA] CREATED_PRODUCT', CREATED_PRODUCT); */

  // * UPDATE EXISTING OBJECTS WITH SLIGHT CHANGES
  // docs: To safely manage variants without the risk of deleting excluded variants, use productVariantsBulkUpdate. If you want to update a single variant, then use productVariantUpdate. - https://shopify.dev/docs/api/admin-graphql/2023-07/mutations/productUpdate
/*   let productUpdate = {
    id: CREATED_PRODUCT?.id,
    title: `${CREATED_PRODUCT?.title}_test`
  };
  resp = await updateShopifyProduct(productUpdate);
  let updatedProduct = resp?.data?.productUpdate?.product;
  const UPDATED_PRODUCT_VARIANT = updatedProduct?.variants?.edges[0].node;

  productUpdate = {
    id: UPDATED_PRODUCT_VARIANT?.id,
    price: 69
  };
  resp = await updateShopifyProductPrice(productUpdate);
  updatedProduct = resp?.data?.productVariantUpdate?.product;
  console.log('[NAVA] updatedProduct', updatedProduct); */

  // * DELETE SHOPIFY PRODUCT
/*   resp = await deleteShopifyProduct({ id: CREATED_PRODUCT?.id });
  const DELETION_SUCCESSFULL =
    resp?.data?.productDelete?.deletedProductId &&
    resp?.data?.productDelete?.userErrors.length === 0;
  console.log('[NAVA] DELETION_SUCCESSFULL', DELETION_SUCCESSFULL); */
};

copyCvaProductsOnShopify();
