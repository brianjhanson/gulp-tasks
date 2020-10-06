const del = require("del");

function clean() {
  const { dest } = this;

  return del(dest);
}

module.exports = clean;
