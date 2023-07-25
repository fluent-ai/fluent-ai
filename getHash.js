const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function readGitignore(directoryPath) {
  const gitignorePath = path.join(directoryPath, '.gitignore');
  const gitignoreRules = [];

  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    gitignoreRules.push(...gitignoreContent.split('\n'));
  }

  return {
    accepts: (file) =>
      !gitignoreRules.some((rule) => file.startsWith(rule)) ||
      gitignoreRules.length === 0,
    denies: (file) =>
      gitignoreRules.some((rule) => file.startsWith(rule)) &&
      gitignoreRules.length > 0,
  };
}

function calculateDirectoryHash(directoryPath) {
  const hash = crypto.createHash('sha1');
  const gitignore = readGitignore(directoryPath);
  const files = fs.readdirSync(directoryPath);

  files.sort().forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (gitignore.denies(filePath)) {
      return;
    }

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
