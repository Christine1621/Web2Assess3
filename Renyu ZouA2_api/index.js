const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./crowdfunding_db'); // 引入数据库连接

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 创建API端点

// 1. 获取所有筹款活动
app.get('/api/fundraisers', (req, res) => {
  const sql = 'SELECT * FROM FUNDRAISER'; // 修改为 FUNDRAISER
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/cities',(req,res)=>{
  const sql = 'SELECT CITY FROM FUNDRAISER GROUP BY CITY';
  db.query(sql,(err,results)=>{
    if(err){
      return res.status(500).json({error:err.message});
    }
    res.json(results);
  })
})
// 2. 获取所有类别
app.get('/api/categories', (req, res) => {
  const sql = 'SELECT * FROM CATEGORY'; // 修改为 CATEGORY
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 3. 获取特定筹款活动的详细信息
app.get('/api/fundraiser/:id', (req, res) => {
  const sql = 'SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ?'; // 使用正确的ID列名
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]); // 返回第一个结果
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行，端口: ${PORT}`);
  app.get('/fundraiser/:id', (req, res) => {
    // This endpoint can be used to serve the fundraiser.html file
    res.sendFile(path.join(__dirname, 'Leo.html'));
});
});