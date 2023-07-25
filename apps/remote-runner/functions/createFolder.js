const fs = require('fs');
const path = require('path');

function createFolder(cwd, { folderPath }) {
  return new Promise((resolve, reject) => {
    if (!folderPath) {
      reject('expected an object {folderPath:string}');
    }
    const fullFolderPath = path.join(cwd, folderPath);
    fs.mkdir(fullFolderPath, { recursive: true }, (error) => {
      if (error) {
        reject(error);
      }
      resolve(`📁 Created folder at ${folderPath}`);
    });
  });
}

module.exports = createFolder;
