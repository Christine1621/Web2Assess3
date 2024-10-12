var db = require("../crowdfunding_db");
var express = require('./../node_modules/express');
var router= express.Router();

router.get('/fundraisers', (req, res) => {
    const sql = 'SELECT f.*, c.name FROM fundraiser f, category c WHERE f.category_id = c.category_id';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
});
  
// 根据筹款人id获取所有捐款数据
router.get('/donations/:id', (req, res) => {
    const sql= `SELECT DATE_FORMAT(date, '%Y-%m-%d %H:%i') AS date, amount, giver FROM donation WHERE fundraiser_id = ? ORDER BY date DESC`;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } 
        res.json(results);
    });
});

// 获取筹款类型以及数量
router.get('/categoryCount', (req, res) => {
    const sql = 'SELECT c.name, COUNT(*) AS count FROM fundraiser f, category c WHERE f.category_id = c.category_id GROUP BY c.name';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
});

// 统计捐款与捐款数量
router.get('/statistics', (req, res) => {
    const sql = 'SELECT SUM(amount) AS total_amount, COUNT(*) AS total_donations FROM donation';
    let data = {
        amount: 0,
        donations: 0,
        count: 0
    };
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        data.amount = results[0].total_amount;
        data.donations = results[0].total_donations;
        const sql1 = 'SELECT COUNT(fundraiser_id) AS count FROM fundraiser WHERE current_funding >= target_funding';
        db.query(sql1, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            data.count = results[0].count;
            res.json(data);
        });
    });
});

// 修改筹款人
router.put('/edit/fundraiser', (req, res) => {
    const { id, caption, organizer, targetFunding, currentFunding, city, category } = req.body;

    const sql = 'UPDATE fundraiser SET caption = ?, organizer = ?, target_funding = ?, current_funding = ?, city = ?, category_id = ? WHERE fundraiser_id = ?';
    db.query(sql, [caption, organizer, targetFunding, currentFunding, city, category, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Fundraiser updated successfully' });
    });
});

// 添加筹款人
router.post('/add/fundraiser', (req, res) => {
    const { caption, organizer, targetFunding, currentFunding, city, category } = req.body;

    const sql = 'INSERT INTO fundraiser (caption, organizer, target_funding, current_funding, city, category_id, active) VALUES (?, ?, ?, ?, ?, ?, 1)';
    db.query(sql, [caption, organizer, targetFunding, currentFunding, city, category], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Fundraiser created successfully' });
    });
});

// 获取所有城市
router.get('/cities', (req, res) => {
    const sql = 'SELECT city FROM fundraiser GROUP BY city';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 获取所有类别
router.get('/categories', (req, res) => {
    const sql = 'SELECT * FROM category';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 根据 id 添加捐款
router.post('/donate', (req, res) => {
    const { fundraiserId, donationAmount, giver } = req.body;

    const sql1 = 'INSERT INTO donation (fundraiser_id, date, amount, giver) VALUES (?, NOW(), ?, ?)';
    db.query(sql1, [fundraiserId, donationAmount, giver], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const sql2 = 'UPDATE fundraiser SET current_funding = current_funding + ? WHERE fundraiser_id = ?';
        db.query(sql2, [donationAmount, fundraiserId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ state: 1, message: "success" });
        });
    });
});

// 获取特定筹款活动的详细信息
router.get('/fundraiser/:id', (req, res) => {
    const sql = 'SELECT f.*, c.name FROM fundraiser f, category c WHERE f.fundraiser_id = ? AND f.category_id = c.category_id';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

// 删除指定 id 的筹款组织
router.delete('/fundraisers/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql1 = 'SELECT * FROM donation WHERE fundraiser_id = ?';
    db.query(sql1, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            return res.json({ state: 0, message: "There are donations for this fundraiser, cannot be deleted" });
        }
        const sql = 'DELETE FROM fundraiser WHERE fundraiser_id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ state: 1, message: 'Delete successful' });
        });
    });
});

module.exports = router;
