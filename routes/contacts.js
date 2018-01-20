var express = require('express');

var router = express.Router();


router.get('/', function (req, res) {
    res.send('get method contacts')
});

module.exports = router;