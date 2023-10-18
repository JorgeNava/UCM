const fs = require('fs');
const path = require('path');

function writeObjectToJSONFile(fileName, obj) {
  const filePath = path.join(process.cwd(), 'docs', `${fileName}.json`);

  if (!fs.existsSync(path.join(__dirname, 'docs'))) {
    fs.mkdirSync(path.join(__dirname, 'docs'));
  }

  fs.writeFile(filePath, JSON.stringify(obj, null, 2), 'utf8', (err) => {
    if (err) {
      console.error("Error escribiendo al archivo:", err);
    } else {
      console.log(`Objeto escrito con éxito en ${filePath}!`);
    }
  });
}

module.exports = writeObjectToJSONFile;