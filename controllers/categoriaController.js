const model = require("../models/categoriaModel");

//listar
exports.index = async (req, res) => {
    let categorias = await model.listar();

    res.render("categorias/index", {
        categorias,
        categoriaEditar: null
    });
};

//salvar
exports.salvar = async (req, res) => {
    await model.salvar({
        nome: req.body.nome.toUpperCase()
    });

    res.redirect("/categorias");
};

//abrir formulário de edição
exports.editar = async (req, res) => {
    let categoriaEditar = await model.buscarPorId(req.params.id);

    if (!categoriaEditar) return res.redirect("/categorias");

    let categorias = await model.listar();

    res.render("categorias/index", {
        categorias,
        categoriaEditar
    });
};

//atualizar
exports.atualizar = async (req, res) => {
    await model.atualizar(req.params.id, {
        nome: req.body.nome.toUpperCase()
    });

    res.redirect("/categorias");
};

//excluir
exports.excluir = async (req, res) => {
    await model.excluir(req.params.id);

    res.redirect("/categorias");
};
