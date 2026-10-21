//model - bd
const db = require("../config/firebase");
const ref = db.ref("fornecedores");

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
        cnpj: dados[id].cnpj
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
        cnpj: registro.val().cnpj
    };
}

//salvar
async function salvar(fornecedor) {
    let novoRegistro = ref.push();

    await novoRegistro.set({
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj
    });

    return {
        id: novoRegistro.key,
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj
    };
}

//atualizar
async function atualizar(id, fornecedor) {
    if (!(await buscarPorId(id))) return null;

    await ref.child(id).update({
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj
    });

    return { id, nome: fornecedor.nome, cnpj: fornecedor.cnpj };
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
