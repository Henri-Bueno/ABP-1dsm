const { Router } = require("express")
const {createUsuario} = require("../repositories/usuarios.repositories");
const { Result } = require("pg");

const router = Router()

module.exports = router;

router.post("/", async function (req, res) {
    const { nome, email, cpf, senha } = req.body;
    if (!cpf || !nome || !senha) {
        return res.status(400)
            .json({ message: "Informações invalidas" })
    }

    const result = await createUsuario(nome, email, cpf, senha)

    res.send(result);
})

/*
curl -X POST http://localhost:3000/api \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana","email":"ana@email.com","cpf":"12345678901","senha":"123","grupo":1}'
*/
