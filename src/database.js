const mongoose = require("mongoose")

const { USER, PASSWORD, DBNAME } = process.env
const mongoUri = `mongodb+srv://${USER}:${PASSWORD}@clusterlg.hqndx.mongodb.net/${DBNAME}?retryWrites=true&w=majority`
const option = ({ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

mongoose.connect(mongoUri, option, (err) => {
    return err ? console.log("Error al conectar a BD") : console.log("Bd conectada")
})