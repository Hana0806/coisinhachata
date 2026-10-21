const model = require("../models/clienteModel");

//listar
exports.index = async (req, res) => {
    let clientes = await model.listar();

    console.log("CLIENTES:", clientes);

    res.render("clientes/index", {
        clientes,
        clienteEditar: null
    });
};

//salvar
exports.salvar = async (req, res) => {
    await model.salvar({
        nome: req.body.nome.toUpperCase(),
        email: req.body.email.toUpperCase()
    });

    res.redirect("/clientes");
};

//abrir formulário de edição
exports.editar = async (req, res) => {
    let clienteEditar = await model.buscarPorId(req.params.id);

    if (!clienteEditar) return res.redirect("/clientes");

    let clientes = await model.listar();

    res.render("clientes/index", {
        clientes,
        clienteEditar
    });
};

//atualizar
exports.atualizar = async (req, res) => {
    await model.atualizar(req.params.id, {
        nome: req.body.nome.toUpperCase(),
        email: req.body.email.toUpperCase()
    });

    res.redirect("/clientes");
};

//excluir
exports.excluir = async (req, res) => {
    await model.excluir(req.params.id);

    res.redirect("/clientes");
};
