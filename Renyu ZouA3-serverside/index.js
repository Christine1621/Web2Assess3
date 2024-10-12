const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path= require('path');
const PORT = 8070;
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.get("/admin",(req,res)=>{
  res.sendFile(path.join(__dirname,'public', 'admin.html'));
})
app.get("/admin/fundraisers",(req,res)=>{
    res.sendFile(path.join(__dirname,'public',  'AddFundraisers.html'))  
})
app.listen(PORT, () => {
  console.log(`server is running,PROR: ${PORT}`);
});