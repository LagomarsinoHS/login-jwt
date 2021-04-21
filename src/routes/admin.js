const express = require("express")
const router = express.Router()
const { getData } = require("../controllers/admin.controller")
const { validateToken } = require("../controllers/auth.controller")

router.get("/", validateToken, getData)



module.exports = router