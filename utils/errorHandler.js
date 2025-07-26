// repositories/casosRepository.js
const { randomUUID } = require('crypto');

// Simulação de um banco de dados em memória usando um array
let casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio na avenida principal",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    },
    {
        id: "c2a3b1e4-5d6f-7890-1234-567890abcdef",
        titulo: "roubo a banco",
        descricao: "Assalto a mão armada na agência do Banco Central, suspeitos fugiram em um carro preto.",
        status: "solucionado",
        agente_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
    }
];

function findAll() {
    return casos;
}

function findById(id) {
    return casos.find(caso => caso.id === id);
}

function create(casoData) {
    const novoCaso = { id: randomUUID(), ...casoData };
    casos.push(novoCaso);
    return novoCaso;
}

function update(id, casoData) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) {
        return null;
    }
    casos[index] = { id, ...casoData };
    return casos[index];
}

function partialUpdate(id, casoData) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) {
        return null;
    }
    casos[index] = { ...casos[index], ...casoData };
    return casos[index];
}

function remove(id) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) {
        return false;
    }
    casos.splice(index, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    partialUpdate,
    remove
};
