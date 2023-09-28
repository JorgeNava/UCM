class CvaAPI {
  async fetchProducts() {
      return [
          { productID: "1", productName: "ProductA", productPrice: 100 },
          { productID: "2", productName: "ProductB", productPrice: 150 }
      ];
  }
}

module.exports = CvaAPI;
