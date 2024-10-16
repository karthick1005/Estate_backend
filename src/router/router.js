const express = require("express")
const { getalluserestate, createquotation } = require("./controller/User_controller")
const router = express.Router()
router.get("/getuserdata", getalluserestate)
router.post("/createquotation", createquotation)
module.exports = router