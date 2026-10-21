// CONTROLLER DA API REST (responde JSON para o app React Native)
const model = require("../models/clienteModel");

function validar(body) {
    if (!body || !body.nome || !body.email) {
        return "Os campos nome e email são obrigatórios.";
    }
    return null;
}

//GET /api/clientes
exports.listar = async (req, res) => {
    try {
        res.json(await model.listar());
    } catch (e) {
        res.status(500).json({ erro: "Erro ao listar clientes." });
    }
};

//GET /api/clientes/:id
exports.consultar = async (req, res) => {
    try {
        let cliente = await model.buscarPorId(req.params.id);

        if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado." });

        res.json(cliente);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao consultar cliente." });
    }
};

//POST /api/clientes
exports.cadastrar = async (req, res) => {
    try {
        let erro = validar(req.body);
        if (erro) return res.status(400).json({ erro });

        res.status(201).json(await model.salvar(req.body));
    } catch (e) {
        res.status(500).json({ erro: "Erro ao cadastrar cliente." });
    }
};

//PUT /api/clientes/:id
exports.alterar = async (req, res) => {
    try {
        let erro = validar(req.body);
        if (erro) return res.status(400).json({ erro });

        let cliente = await model.atualizar(req.params.id, req.body);

        if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado." });

        res.json(cliente);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao alterar cliente." });
    }
};

//DELETE /api/clientes/:id
exports.excluir = async (req, res) => {
    try {
        let ok = await model.excluir(req.params.id);

        if (!ok) return res.status(404).json({ erro: "Cliente não encontrado." });

        res.json({ mensagem: "Cliente excluído com sucesso." });
    } catch (e) {
        res.status(500).json({ erro: "Erro ao excluir cliente." });
    }
};
