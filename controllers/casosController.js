const { v4: uuidv4 } = require('uuid');
const repository = require('../repositories/casosRepository');

function getAll(req, res) {
  res.json(repository.findAll());
}

function getById(req, res) {
  const caso = repository.findById(req.params.id);
  if (!caso) return res.status(404).json({ error: "Caso não encontrado" });
  res.json(caso);
}

function create(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;
  if (!titulo || !descricao || !status || !agente_id) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors: [{ campo: "Todos os campos são obrigatórios" }]
    });
  }

  if (!["aberto", "solucionado"].includes(status)) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors: [{ status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'" }]
    });
  }

  const caso = {
    id: uuidv4(),
    titulo,
    descricao,
    status,
    agente_id
  };

  res.status(201).json(repository.create(caso));
}

function update(req, res) {
  const casoExistente = repository.findById(req.params.id);
  if (!casoExistente) return res.status(404).json({ error: "Caso não encontrado" });

  const novoCaso = { ...req.body, id: req.params.id };
  res.json(repository.update(req.params.id, novoCaso));
}

function partialUpdate(req, res) {
  const caso = repository.findById(req.params.id);
  if (!caso) return res.status(404).json({ error: "Caso não encontrado" });

  const atualizado = { ...caso, ...req.body };
  res.json(repository.update(req.params.id, atualizado));
}

function remove(req, res) {
  const ok = repository.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "Caso não encontrado" });

  res.status(204).send();
}

module.exports = { getAll, getById, create, update, partialUpdate, remove };
