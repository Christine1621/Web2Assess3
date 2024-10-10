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
  const sql = 'SELECT f.*,c.NAME FROM FUNDRAISER f, CatEGORY c WHERE f.CATEGORY_ID = c.CATEGORY_ID'; // 修改为 FUNDRAISER
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//获取所有城市
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

//根据id添加捐款
app.post('/api/donate', (req, res) => {
    const { fundraiserId, donationAmount } = req.body;
    // console.log(fundraiserId,donationAmount);
    //先存进 donation表
    const sql1 = 'INSERT INTO DONATION (FUNDRAISER_ID, DATE,AMOUNT,GIVER) VALUES (?, NOW(),?,1)';
    db.query(sql1, [fundraiserId, donationAmount], (err, results) => {

      if (err) {
        return res.status(500).json({ error: err.message });
      }
      //再更新fundraiser表
      const sql2 = 'UPDATE FUNDRAISER SET CURRENT_FUNDING = CURRENT_FUNDING + ? WHERE FUNDRAISER_ID = ?'; // 使用正确的ID列名
      db.query(sql2, [donationAmount, fundraiserId], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({state:1,message:"success"});
      })
    })
})
// 3. 获取特定筹款活动的详细信息
app.get('/api/fundraiser/:id', (req, res) => {
  const sql = 'SELECT f.*,c.NAME FROM FUNDRAISER f,CATEGORY c WHERE f.FUNDRAISER_ID = ? and f.CATEGORY_ID = c.CATEGORY_ID'; // 使用正确的ID列名
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
//   app.get('/fundraiser/:id', (req, res) => {
//     // This endpoint can be used to serve the fundraiser.html file
//     res.sendFile(path.join(__dirname, 'Leo.html'));
// });
});