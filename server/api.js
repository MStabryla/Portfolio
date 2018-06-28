const express = require("express");
const router = express.Router();
const data = require("./data");

router.get("/",(req,res) => {
    res.send("api works");
})
router.get("/project",(req,res) =>{
    res.json({"ID":1,"Title":"Standard"});
})
router.get("/projects",(req,res) =>{
    res.json(data);
})
router.get("/colors",(req,res) => {
    res.sendFile(__dirname + "/colors.json");
})

module.exports = router;