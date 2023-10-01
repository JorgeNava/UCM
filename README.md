# Unified-Catalog-Manager-API

A REST API that manages shopify inventory and diverse product suppliers catalgs, it uses:
  
    Node.js
    
    Express.js
    
    Mongoose for database connection
    
    MVC architectural design
    
    Dependency Injection architectural design
  
    Clean Code architectural design

To run server user 'npm run dev', which will start de Nodemon server.


LAST THINGS DONE:
- Integrated Shopify API
- Acomplished pushing products using CVA_PRODUCTS_SAMPLE

TO-DO:
- First CVA pull
  - Ensure CVA API is retreiving expected data, send email.
  - Ensure XML to JSON transformation.
  - Search for Shopify bulk products creations.
- Integrate CT Internacional
  - Create: api, api adapter, routes, controllers and services.
  - Create: getProducts
  - Integrate to pullAndPushAll
