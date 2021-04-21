const user = {}

const User = require("../models/user")
const Joi = require("@hapi/joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const schemaRegister = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    //name: Joi.string().min(6).max(255).required(),
    //password: Joi.string().min(6).max(255).required()
})
//Con joi le indico que campos quiero validar, tiene que ser el nombre del campo entrante
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email()
})


user.registerUser = async (req, res) => {
    console.log("entre a RegisterUser")
    try {
        const { name, email, password } = req.body
        const { error } = schemaRegister.validate({ email })//Aqui le indico que validara el registro que defini antes pasandole el req.body o lo que quiero validar en particular
        if (error) return res.status(400).json({ error: error.details[0].message })

        //Encriptacion password
        const salt = await bcrypt.genSalt(10)
        console.log("salt", salt)
        const encryptedPassword = await bcrypt.hash(password, salt)
        //Creacion del usuario
        const nuevoUsuario = await new User({ name, email, password: encryptedPassword }).save()
        //Respuesta del servidor
        res.json({ msg: "Usuario creado", nuevoUsuario })
    } catch (err) {
        res.status(400).json({ msg: "Ha ocurrido un error", error: err.message })
    }
}

user.login = async (req, res) => {
    console.log("Entre al login")
    const { email, password } = req.body
    const { error } = schemaLogin.validate({ email })
    if (error) return res.status(400).json({ error: error.details[0].message })

    const existUser = await User.findOne({ email })
    console.log("Usuario buscado", existUser)
    if (!existUser) return res.status(400).json({ msg: "Email y/o contraseña incorrectos" })

    //Validacion password
    const isValidPassword = await bcrypt.compare(password, existUser.password)
    if (!isValidPassword) return res.status(400).json({ msg: "Email y/o contraseña incorrectos" })

    //Generacion Token
    //Como primer parametro es un {}con la info que se le quiere pasar
    //Segundo parámetro es el string secreto q decidiso para crear un token
    const token = jwt.sign({
        name: existUser.name,
        email
    }, process.env.TOKEN_SECRET, {
        expiresIn: "6h"
    })
    req.auth = token
    res.json({ msg: "Logeado", token })
    //header("auth", token).
}

module.exports = user