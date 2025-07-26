const agentes = [];

function findAll() {
  return agentes;
}

function findById(id) {
  return agentes.find(a => a.id === id);
}

function create(agente) {
  agentes.push(agente);
  return agente;
}

function update(id, novoAgente) {
  const index = agentes.findIndex(a => a.id === id);
  if (index !== -1) {
    agentes[index] = novoAgente;
    return novoAgente;
  }
  return null;
}

function remove(id) {
  const index = agentes.findIndex(a => a.id === id);
  if (index !== -1) {
    agentes.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = { findAll, findById, create, update, remove };
