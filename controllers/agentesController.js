const { v4: uuidv4 } = require('uuid');
const repository = require('../repositories/agentesRepository');

function getAll(req, res) {
  res.json(repository.findAll());
}

function getById(req, res) {
  const agente = repository.findById(req.params.id);
  if (!agente) return res.status(404).json({ error: "Agente não encontrado" });
  res.json(agente);
}

function create(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;

  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors: [{ campo: "Todos os campos são obrigatórios" }]
    });
  }

  const agente = {
    id: uuidv4(),
    nome,
    dataDeIncorporacao,
    cargo
  };

  res.status(201).json(repository.create(agente));
}

function update(req, res) {
  const agenteExistente = repository.findById(req.params.id);
  if (!agenteExistente) return res.status(404).json({ error: "Agente não encontrado" });

  const novoAgente = { ...req.body, id: req.params.id };
  res.json(repository.update(req.params.id, novoAgente));
}

function partialUpdate(req, res) {
  const agente = repository.findById(req.params.id);
  if (!agente) return res.status(404).json({ error: "Agente não encontrado" });

  const atualizado = { ...agente, ...req.body };
  res.json(repository.update(req.params.id, atualizado));
}

function remove(req, res) {
  const ok = repository.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "Agente não encontrado" });

  res.status(204).send();
}

module.exports = { getAll, getById, create, update, partialUpdate, remove };
