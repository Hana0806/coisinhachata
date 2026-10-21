const express = require("express");
const path = require("path");

const app = express();

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// FORM + JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS (permite o app React Native / Expo Snack acessar a API)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// ROTAS
const categoriaRoutes = require("./routes/categoriaRoutes");
app.use("/categorias", categoriaRoutes);

const clienteRoutes = require("./routes/clienteRoutes");
app.use("/clientes", clienteRoutes);

const fornecedorRoutes = require("./routes/fornecedorRoutes");
app.use("/fornecedores", fornecedorRoutes);

// API REST
const clienteApiRoutes = require("./routes/clienteApiRoutes");
app.use("/api/clientes", clienteApiRoutes);

const categoriaApiRoutes = require("./routes/categoriaApiRoutes");
app.use("/api/categorias", categoriaApiRoutes);

const fornecedorApiRoutes = require("./routes/fornecedorApiRoutes");
app.use("/api/fornecedores", fornecedorApiRoutes);

// 🔥 INDEX PRINCIPAL
app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Página Inicial",
  });
});

// SERVER (o Render define a PORT sozinho)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
