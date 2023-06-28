const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const gitignoreParser = require('gitignore-parser');

function readGitignore(directoryPath) {
  const gitignorePath = path.join(directoryPath, '.gitignore');

  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    return gitignoreParser.compile(gitignoreContent);
  } else {
    return {
      accepts: () => true, // If no .gitignore file, accept all files.
      denies: () => false, // If no .gitignore file, deny no files.
    };
  }
}

function calculateDirectoryHash(directoryPath) {
  const hash = crypto.createHash('sha1');
  const gitignore = readGitignore(directoryPath);
  const files = fs.readdirSync(directoryPath);

  files.sort().forEach((file) => {
    if (!gitignore.accepts(file)) {
      return;
    }

    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const fileContent = fs.readFileSync(filePath);
      hash.update(fileContent);
    } else if (stats.isDirectory()) {
      hash.update(calculateDirectoryHash(filePath));
    }
  });

  return hash.digest('hex');
}

console.log(calculateDirectoryHash('./'));
