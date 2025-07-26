const casos = [];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find(c => c.id === id);
}

function create(caso) {
  casos.push(caso);
  return caso;
}

function update(id, novoCaso) {
  const index = casos.findIndex(c => c.id === id);
  if (index !== -1) {
    casos[index] = novoCaso;
    return novoCaso;
  }
  return null;
}

function remove(id) {
  const index = casos.findIndex(c => c.id === id);
  if (index !== -1) {
    casos.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = { findAll, findById, create, update, remove };
