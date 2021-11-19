let express = require('express');
let multer = require('multer');
let db = require('../db');
let router = express.Router();
let upload = multer();
router.use(upload.array());

router.get('/orders', (req, res) => {
    let today = new Date();
    today = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    let qry = `SELECT order_num
    FROM wsi_order
    WHERE order_date = STR_TO_DATE("${req.query.fromDate || today}", "%Y-%m-%d");`;

    db.executeQuery(qry, (qryResults, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            let results = {
                total: qryResults.length,
                date: req.query.fromDate || today,
                orders: []
            }

            qryResults.forEach(record => {
                results.orders.push(record.order_num);
            })

            res.status(200).json(results);
        }
    });
});

router.get('/orders/recentCount', (req, res) => {
    let today = new Date();
    today = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    let qry = `SELECT COUNT(*) AS 'count'
    FROM wsi_order
    WHERE last_updated >= CURDATE();`;

    db.executeQuery(qry, (qryResults, err) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({'count': qryResults[0].count})
        }
    });
});

module.exports = router;