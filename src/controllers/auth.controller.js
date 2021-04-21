const jwt = require("jsonwebtoken")
const auth = {}


auth.validateToken = async (req, res, next) => {
    console.log("1.-res", res.header.auth)
    const token = await req.header("auth")
    console.log("token", token)
    if (!token) return res.status(401).json({ msg: "Acceso denegado" })

    try {
        const tokenVerified = jwt.verify(token, process.env.TOKEN_SECRET) //verifico el token
        req.user = tokenVerified //agrego el token con los datos a req.user
        console.log("REQ_USER", req.user)
        next()
    } catch (error) {
        res.json({ error })
    }
}




module.exports = auth