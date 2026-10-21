//model - bd
const db = require("../config/firebase");
const ref = db.ref("clientes");

// o Firebase não aceita esses caracteres no id
function idValido(id) {
    return typeof id === "string" && id !== "" && !/[.#$\[\]\/]/.test(id);
}

//listar
async function listar() {
    let registros = await ref.once("value");
    let dados = registros.val();

    if (!dados) return [];

    return Object.keys(dados).map(id => ({
        id,
        nome: dados[id].nome,
        email: dados[id].email
    }));
}

//consultar
async function buscarPorId(id) {
    if (!idValido(id)) return null;

    let registro = await ref.child(id).once("value");

    if (!registro.exists()) return null;

    return {
        id,
        nome: registro.val().nome,
        email: registro.val().email
    };
}

//salvar
async function salvar(cliente) {
    let novoRegistro = ref.push();

    await novoRegistro.set({
        nome: cliente.nome,
        email: cliente.email
    });

    return {
        id: novoRegistro.key,
        nome: cliente.nome,
        email: cliente.email
    };
}

//atualizar
async function atualizar(id, cliente) {
    if (!(await buscarPorId(id))) return null;

    await ref.child(id).update({
        nome: cliente.nome,
        email: cliente.email
    });

    return { id, nome: cliente.nome, email: cliente.email };
}

//excluir
async function excluir(id) {
    if (!(await buscarPorId(id))) return false;

    await ref.child(id).remove();

    return true;
}

//exportar
module.exports = {
    listar,
    buscarPorId,
    salvar,
    atualizar,
    excluir
};
