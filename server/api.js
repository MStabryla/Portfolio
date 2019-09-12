const express = require("express");
const router = express.Router();
const data = require("./data");

router.get("/",(req,res) => {
    res.send("api works");
})
router.get("/experience",(req,res) => {
    res.send(__dirname + "/experience.json");
})
router.get("/colors",(req,res) => {
    res.sendFile(__dirname + "/colors.json");
})

module.exports = router;