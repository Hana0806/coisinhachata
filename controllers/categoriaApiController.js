// CONTROLLER DA API REST - CATEGORIAS (responde JSON)
const model = require("../models/categoriaModel");

function validar(body) {
    if (!body || !body.nome) return "O campo nome é obrigatório.";
    return null;
}

//GET /api/categorias
exports.listar = async (req, res) => {
    try {
        res.json(await model.listar());
    } catch (e) {
        res.status(500).json({ erro: "Erro ao listar categorias." });
    }
};

//GET /api/categorias/:id
exports.consultar = async (req, res) => {
    try {
        let categoria = await model.buscarPorId(req.params.id);

        if (!categoria) return res.status(404).json({ erro: "Categoria não encontrada." });

        res.json(categoria);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao consultar categoria." });
    }
};

//POST /api/categorias
exports.cadastrar = async (req, res) => {
    try {
        let erro = validar(req.body);
        if (erro) return res.status(400).json({ erro });

        res.status(201).json(await model.salvar(req.body));
    } catch (e) {
        res.status(500).json({ erro: "Erro ao cadastrar categoria." });
    }
};

//PUT /api/categorias/:id
exports.alterar = async (req, res) => {
    try {
        let erro = validar(req.body);
        if (erro) return res.status(400).json({ erro });

        let categoria = await model.atualizar(req.params.id, req.body);

        if (!categoria) return res.status(404).json({ erro: "Categoria não encontrada." });

        res.json(categoria);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao alterar categoria." });
    }
};

//DELETE /api/categorias/:id
exports.excluir = async (req, res) => {
    try {
        let ok = await model.excluir(req.params.id);

        if (!ok) return res.status(404).json({ erro: "Categoria não encontrada." });

        res.json({ mensagem: "Categoria excluída com sucesso." });
    } catch (e) {
        res.status(500).json({ erro: "Erro ao excluir categoria." });
    }
};
