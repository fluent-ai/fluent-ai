const fs = require('fs');
const path = require('path');

function writeFile(cwd, { filePath, contents }) {
  return new Promise((resolve, reject) => {
    if (!filePath || !contents) {
      reject('expected an object {filePath:string, contents:string}');
    }
    fs.writeFile(path.join(cwd, filePath), contents, function (error) {
      if (error) {
        reject(error);
      }
      resolve(`📝 Wrote ${filePath}`);
    });
  });
}

module.exports = writeFile;
