//前端服务器
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path= require('path');
const PORT = 3010;
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'admin.html'));
})
// 启动服务器
app.listen(PORT, () => {
  console.log(`server is running,PROR: ${PORT}`);
//   app.get('/fundraiser/:id', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Leo.html'));
// });
});