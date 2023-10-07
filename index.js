const creatApp = require('./src/server.js');
const configProvider = require('./src/lib/config-provider');

const app = creatApp();

const port = configProvider.get('port');

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});