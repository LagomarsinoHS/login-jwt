const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(morgan("dev"))
app.use(express.json())

//### RUTAS ###
app.use("/",require("./routes/home"))
app.use("/api/user/",require("./routes/user"))
app.use("/api/admin",require("./routes/admin"))

module.exports = app