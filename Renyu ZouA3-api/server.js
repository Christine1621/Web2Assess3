var express =require('express');
var app = express();
var cors = require('cors');
var http=require('http');
var bodyParser = require('body-parser');
var concertAPI = require("./controllerAPI/api-controller");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//设置api前缀
app.use("/api",concertAPI);

app.listen(3000);
console.log("Server up and running on port 3000")