const model = require("../models/fornecedorModel");

//listar
exports.index = async (req, res) => {
    let fornecedores = await model.listar();

    res.render("fornecedores/index", {
        fornecedores,
        fornecedorEditar: null
    });
};

//salvar
exports.salvar = async (req, res) => {
    await model.salvar({
        nome: req.body.nome.toUpperCase(),
        cnpj: req.body.cnpj.toUpperCase()
    });

    res.redirect("/fornecedores");
};

//abrir formulário de edição
exports.editar = async (req, res) => {
    let fornecedorEditar = await model.buscarPorId(req.params.id);

    if (!fornecedorEditar) return res.redirect("/fornecedores");

    let fornecedores = await model.listar();

    res.render("fornecedores/index", {
        fornecedores,
        fornecedorEditar
    });
};

//atualizar
exports.atualizar = async (req, res) => {
    await model.atualizar(req.params.id, {
        nome: req.body.nome.toUpperCase(),
        cnpj: req.body.cnpj.toUpperCase()
    });

    res.redirect("/fornecedores");
};

//excluir
exports.excluir = async (req, res) => {
    await model.excluir(req.params.id);

    res.redirect("/fornecedores");
};
