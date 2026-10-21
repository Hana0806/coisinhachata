// CONTROLLER DA API REST - FORNECEDORES (responde JSON)
const model = require("../models/fornecedorModel");

function validar(body) {
    if (!body || !body.nome || !body.cnpj) {
        return "Os campos nome e cnpj são obrigatórios.";
    }
    return null;
}

//GET /api/fornecedores
exports.listar = async (req, res) => {
    try {
        res.json(await model.listar());
    } catch (e) {
        res.status(500).json({ erro: "Erro ao listar fornecedores." });
    }
};

//GET /api/fornecedores/:id
exports.consultar = async (req, res) => {
    try {
        let fornecedor = await model.buscarPorId(req.params.id);

        if (!fornecedor) return res.status(404).json({ erro: "Fornecedor não encontrado." });

        res.json(fornecedor);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao consultar fornecedor." });
    }
};

//POST /api/fornecedores
exports.cadastrar = async (req, res) => {
    try {
        let erro = validar(req.body);
        if (erro) return res.status(400).json({ erro });

        res.status(201).json(await model.salvar(req.body));
    } catch (e) {
        res.status(500).json({ erro: "Erro ao cadastrar fornecedor." });
    }
};

//PUT /api/fornecedores/:id
exports.alterar = async (req, res) => {
    try {
        let erro = validar(req.body);
        if (erro) return res.status(400).json({ erro });

        let fornecedor = await model.atualizar(req.params.id, req.body);

        if (!fornecedor) return res.status(404).json({ erro: "Fornecedor não encontrado." });

        res.json(fornecedor);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao alterar fornecedor." });
    }
};

//DELETE /api/fornecedores/:id
exports.excluir = async (req, res) => {
    try {
        let ok = await model.excluir(req.params.id);

        if (!ok) return res.status(404).json({ erro: "Fornecedor não encontrado." });

        res.json({ mensagem: "Fornecedor excluído com sucesso." });
    } catch (e) {
        res.status(500).json({ erro: "Erro ao excluir fornecedor." });
    }
};
