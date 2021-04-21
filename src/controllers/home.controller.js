const home = {}

home.getHome = (req, res) => {
    console.log("estoy en home")
    res.json({msg:"Estoy en el directorio home"})
}

module.exports = home