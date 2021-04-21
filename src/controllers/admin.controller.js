const admin = {}


admin.getData = (req, res) => {
    res.json({
        msg: "entre a la ruta de admin luego de pasar la autenticacion"
    })
}

module.exports = admin