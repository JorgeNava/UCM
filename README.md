# Unified-Catalog-Manager-API

A REST API that manages shopify inventory and diverse product suppliers catalgs, it uses:
  
    Node.js
    
    Express.js
    
    MVC architectural design
    
    Dependency Injection architectural design
  
    Clean Code architectural design

To run server user 'npm run dev', which will start de Nodemon server (default port 8000).


LAST THINGS DONE:
- Integrated CT Internacional API
- Acomplished pushing products from CVA and CTI using samples data.


TO-DO:
- First CVA pull
  - Ensure CVA API is retreiving expected data, send email.
  - Ensure XML to JSON transformation.
  - Search for Shopify bulk products creations.
- First CTI pull
  - Ensure CTI API is retreiving expected data, send email.
- Design how to create full ShopifyProduct
  - CVA products
  - CTI products
- Design products pull strategy
  - CVA
  - CTI
- Design how to manage products conflicts
- Desing how to set default values for products when they dont come with it.
