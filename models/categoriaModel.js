//model - bd
const db = require("../config/firebase");
const ref = db.ref("categorias");

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
        nome: dados[id].nome
    }));
}

//consultar
async function buscarPorId(id) {
    if (!idValido(id)) return null;

    let registro = await ref.child(id).once("value");

    if (!registro.exists()) return null;

    return { id, nome: registro.val().nome };
}

//salvar
async function salvar(categoria) {
    let novoRegistro = ref.push();

    await novoRegistro.set({
        nome: categoria.nome
    });

    return { id: novoRegistro.key, nome: categoria.nome };
}

//atualizar
async function atualizar(id, categoria) {
    if (!(await buscarPorId(id))) return null;

    await ref.child(id).update({
        nome: categoria.nome
    });

    return { id, nome: categoria.nome };
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
