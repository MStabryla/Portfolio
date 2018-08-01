const express = require("express");
const path = require("path");
const http = require("http");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'dist')));

app.use('/api',require("./server/api"));
app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'));
    //res.sendFile(__dirname + req.url);
})
const server = http.createServer(app);
server.listen(3000,() => console.log("Start"));