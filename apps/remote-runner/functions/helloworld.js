function helloworld(name) {
  return new Promise((resolve) => {
    resolve(`Hello ${name}!`);
  });
}

module.exports = helloworld;
