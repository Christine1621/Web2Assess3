//Introduce the required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./crowdfunding_db'); 

const server = express();

server.use(cors());//Enable CORS
server.use(bodyParser.json());//Parse the request body in JSON format

//Define an API to get all fundraisers
server.get('/api/fundraisers', (req, res) => {
    const sql = 'SELECT * FROM FUNDRAISER';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

//Define an API to get all categories
server.get('/api/categories', (req, res) => {
    const sql = 'SELECT * FROM CATEGORY';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

//Define an API to get fundraising activities under a specific category based on the category ID
server.get('/api/fundraisers/category/:categoryId', (req, res) => {
    const sql = `
        SELECT f.*, c.NAME as CATEGORY_NAME 
        FROM FUNDRAISER f 
        JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
        WHERE f.ACTIVE = 'true' AND f.CATEGORY_ID = ?`;
    db.query(sql, [req.params.categoryId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

//Define an API to get a fundraiser ID
server.get('/api/fundraiser/:id', (req, res) => {
    const sql = 'SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]); 
    });
});

//Set the port of the server to 3000 in the environment variable
const PORT = process.env.PORT || 3000;

//Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`The server is running, port: ${PORT}`);
});