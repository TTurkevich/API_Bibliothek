function newId() {
  const id = String(Math.floor(Date.now() * Math.random()));
  return id;
}

module.exports = {
  newId,
};
