const fs = require('fs');
const path = require('path');

function readFile(cwd, { filePath }) {
  return new Promise((resolve, reject) => {
    if (!filePath) {
      reject('expected an object {filePath:string}');
    }
    fs.readFile(path.join(cwd, filePath), 'utf8', function (error, data) {
      if (error) {
        reject(error);
      }
      console.log(`📖 Read ${filePath}`);
      resolve(data);
    });
  });
}

module.exports = readFile;
