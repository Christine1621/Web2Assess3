//前端服务器
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path= require('path');
const PORT = 8080;
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'index.html'));
})
app.get("/Leo",(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'Leo.html'));
})
app.get("/Fundraisers",(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'Fundraisers.html'));
})
app.get("/donation",(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'donation.html'));
})
// 启动服务器
app.listen(PORT, () => {
  console.log(`server is running,PROR: ${PORT}`);
//   app.get('/fundraiser/:id', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Leo.html'));
// });
});