const creatApp = require('./src/server.js');
const configProvider = require('./src/lib/config-provider');

const app = creatApp();

const port = configProvider.get('port');

app.listen(port, () => {
  console.log(`[NAVA] server running at port ${port}`);
});