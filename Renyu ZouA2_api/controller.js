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

// 根据筹款人id获取所有捐款数据
app.get('/api/donations/:id', (req, res) => {
    const sql= `SELECT DATE_FORMAT(DATE, '%Y-%m-%d %H:%i') AS DATE,AMOUNT,GIVER FROM DONATION WHERE FUNDRAISER_ID = ? ORDER BY DATE DESC`;
    db.query(sql,[req.params.id],(err,results)=>{
        if(err){
            return res.status(500).json({error:err.message});
        } 
        res.json(results);
    })
})
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
    const { fundraiserId, donationAmount, giver } = req.body;
    // console.log(fundraiserId,donationAmount);
    //先存进 donation表
    const sql1 = 'INSERT INTO DONATION (FUNDRAISER_ID, DATE,AMOUNT,GIVER) VALUES (?, NOW(),?,?)';
    console.log(req.body)
    db.query(sql1, [fundraiserId, donationAmount,giver], (err, results) => {
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

//删除指定id的筹款组织
app.delete('/api/fundraisers/delete/:id', (req, res) => {
    const { id } = req.params; 
    // 查询是否有捐款
    const sql1 = 'SELECT * FROM DONATION WHERE FUNDRAISER_ID = ?';
    db.query(sql1, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // 如果存在捐款，返回不能删除的消息
        if (results.length > 0) {
            return res.json({ state: 0, message: "There are donations for this fundraiser, cannot be deleted" });
        }
        // 如果没有捐款，则执行删除操作
        const sql = 'DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';
        db.query(sql, [id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ state: 1, message: 'Delete successful' });
        });
    });
});


// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});  