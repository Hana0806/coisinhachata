// CONFIGURAÇÃO FIREBASE REALTIME DATABASE
const admin = require("firebase-admin");

// Renomeie o arquivo serviceAccountKey-exemplo.json
// para serviceAccountKey.json e coloque suas credenciais do Firebase.

// No Render a chave vem da variável de ambiente FIREBASE_SERVICE_ACCOUNT
// (o conteúdo inteiro do JSON). No computador, usa o arquivo local.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aula-marcio-c6e7a-default-rtdb.firebaseio.com/"
});

const db = admin.database();

module.exports = db;
