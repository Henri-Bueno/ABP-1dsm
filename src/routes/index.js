const { Router } = require("express")
const usuarios = require("./usuarios.routes")

const router = Router()

router.use("/usuarios", usuarios)

router.use(function(_req,res){
    res.status(404).json({message: "Rota inexistente"})
})

module.exports = router;