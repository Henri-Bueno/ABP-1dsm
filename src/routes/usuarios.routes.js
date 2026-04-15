const { Router } = require("express")
const {
    createUsuario, 
    updateUsuarioCpf, 
    updateUsuarioNome, 
    updateUsuarioEmail,
    updateUsuarioSenha,
    findUsuarioById
    } 
    = require("../repositories/usuarios.repositories");

const authmiddleware = require("../middlewares/auth.middleware")

const router = Router()

/* POST CRIAR USUÁRIO
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana","email":"ana@email.com","cpf":"12345678901","senha":"123456","grupo":1}'
*/
router.post("/", async function (req, res) {
    const { nome, email, cpf, senha } = req.body;
    if (!cpf || !nome || !senha) {
        return res.status(400)
            .json({ message: "Informações invalidas" })
    }

    if (senha.trim().length < 6) {
        return res 
            .status(400)
            .json({message: "A senha deve ter pelo menos 6 caracteres"})
    }
    try{
    const result = await createUsuario(nome, email, cpf, senha)
    
    res.send(result);
    }catch(e){
        if(e && e.code == "23505"){
            return res.status(409).json({
                message: "já existe usuario com os dados informados"
            })
        }
        return res.status(409).json({
                message: "Problemas internos no servidor"
            })
    }    
})

/* PATCH CPF USUÁRIO
curl -X PATCH http://localhost:3000/api/usuarios/29/cpf \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoyOSwiaWF0IjoxNzc2Mjc3MTg1LCJleHAiOjE3NzYyNzc3ODV9.D4kYrNfIPp6HQ_oAwzNokIC-S2T02RnYOCdZ-UegSq4" \
  -d '{"cpf":"11122233344"}'
*/
router.patch("/:idusuario/cpf", authmiddleware, async function (req, res) {
    const idUsuario = getIdUsuario(req.params)

    if (!idUsuario) {
        return res.status(400).json({ message: "id_usuario inválido"})
    }

        const { cpf } = req.body
        if (!cpf) {
            return res.status(400).json({ message: "cpf é obrigatório" })
        }

        try {
            const result = await updateUsuarioCpf(idUsuario, cpf)
            if (!result) {
                return res.status(404).json({ message: "Usuário não encontrado" })
            }
            const usuario = await findUsuarioById(result.id_usuario)
            return res.status(200).json(usuario)
        }catch(e){
        if(e && e.code == "23505"){
            return res.status(409).json({
                message: "já existe usuario com o CPF informado"
            })
        }
        return res.status(409).json({
                message: "Problemas internos no servidor"
            })
    }
})

/* PATCH NOME USUÁRIO
curl -X PATCH http://localhost:3000/api/usuarios/3/nome \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoyOSwiaWF0IjoxNzc2Mjc3MTg1LCJleHAiOjE3NzYyNzc3ODV9.D4kYrNfIPp6HQ_oAwzNokIC-S2T02RnYOCdZ-UegSq4" \
  -d '{"nome":"Mary"}'
*/
router.patch("/:idusuario/nome", authmiddleware, async function (req, res) {
    const idUsuario = getIdUsuario(req.params)

    if (!idUsuario) {
        return res.status(400).json({ message: "id_usuario inválido"})
    }

        const { nome } = req.body
        if (!nome) {
            return res.status(400).json({ message: "nome é obrigatório" })
        }

        try {
            const result = await updateUsuarioNome(idUsuario, nome)
            if (!result) {
                return res.status(404).json({ message: "Usuário não encontrado" })
            }
            const usuario = await findUsuarioById(result.id_usuario)
            return res.status(200).json(usuario)
        }catch(e){
        return res.status(409).json({
                message: "Problemas internos no servidor"
            })
    }
})

/* PATCH EMAIL USUÁRIO
curl -X PATCH http://localhost:3000/api/usuarios/3/email \
  -H "Content-Type: application/json" \
   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoyOSwiaWF0IjoxNzc2Mjc3MTg1LCJleHAiOjE3NzYyNzc3ODV9.D4kYrNfIPp6HQ_oAwzNokIC-S2T02RnYOCdZ-UegSq4" \
  -d '{"email":"maria@teste.com"}'
*/
router.patch("/:idusuario/email", authmiddleware, async function (req, res) {
    const idUsuario = getIdUsuario(req.params)

    if (!idUsuario) {
        return res.status(400).json({ message: "id_usuario inválido"})
    }

        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "email é obrigatório" })
        }

        try {
            const result = await updateUsuarioEmail(idUsuario, email)
            if (!result) {
                return res.status(404).json({ message: "Usuário não encontrado" })
            }
            const usuario = await findUsuarioById(result.id_usuario)
            return res.status(200).json(usuario)
        }catch(e){
        if(e && e.code == "23505"){
            return res.status(409).json({
                message: "já existe usuario com o email informado"
            })
        }
        return res.status(409).json({
                message: "Problemas internos no servidor"
            })
    }
})

/* PATCH SENHA USUÁRIO
curl -X PATCH http://localhost:3000/api/usuarios/3/senha \
  -H "Content-Type: application/json" \
   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoyOSwiaWF0IjoxNzc2Mjc3MTg1LCJleHAiOjE3NzYyNzc3ODV9.D4kYrNfIPp6HQ_oAwzNokIC-S2T02RnYOCdZ-UegSq4" \
  -d '{"senha":"123456"}'
*/
router.patch("/:idusuario/senha", authmiddleware, async function (req, res) {
    const idUsuario = getIdUsuario(req.params)

    if (!idUsuario) {
        return res.status(400).json({ message: "id_usuario inválido"})
    }

        const { senha } = req.body
        if (!senha) {
            return res.status(400).json({ message: "senha é obrigatória" })
        }
        if (senha.trim().length < 6) {
        return res 
            .status(400)
            .json({message: "A senha deve ter pelo menos 6 caracteres"})
    }

        try {
            const result = await updateUsuarioSenha(idUsuario, senha)
            if (!result) {
                return res.status(404).json({ message: "Usuário não encontrado" })
            }
            const usuario = await findUsuarioById(result.id_usuario)
            return res.status(200).json(usuario)
        }catch(e){
        return res.status(409).json({
                message: "Problemas internos no servidor"
            })
    }
})

function getIdUsuario(params){
    const idUsuario = Number(params.idusuario)

    if(!Number.isInteger(idUsuario) || idUsuario <= 0){
        return null
    }
    return idUsuario

}

module.exports = router;







