const fs = require('fs');
const path = require('path');

function readFile(cwd, { filename }) {
  return new Promise((resolve, reject) => {
    if (!filename) {
      reject('expected an object {filename:string}');
    }
    fs.readFile(path.join(cwd, filename), 'utf8', function (error, data) {
      if (error) {
        reject(error);
      }
      console.log(`📖 Read ${filename}`);
      resolve(data);
    });
  });
}

module.exports = readFile;
