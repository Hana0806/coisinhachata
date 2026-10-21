const express = require("express");
const router = express.Router();

const controller = require("../controllers/fornecedorApiController");

router.get("/", controller.listar);         // Listar
router.get("/:id", controller.consultar);   // Consultar
router.post("/", controller.cadastrar);     // Cadastrar
router.put("/:id", controller.alterar);     // Alterar
router.delete("/:id", controller.excluir);  // Excluir

module.exports = router;
