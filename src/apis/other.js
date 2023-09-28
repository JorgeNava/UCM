class OtherAPI {
  async fetchProducts() {
      return `
          <products>
              <product>
                  <id>101</id>
                  <title>ProductX</title>
                  <cost>200</cost>
              </product>
              <product>
                  <id>102</id>
                  <title>ProductY</title>
                  <cost>250</cost>
              </product>
          </products>
      `;
  }
}

module.exports = OtherAPI;
