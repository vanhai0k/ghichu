var express = require('express');
var router = express.Router();
var noteController = require('../controllers/note.controller')

/* GET home page. */
router.get('/note', noteController.list);

module.exports = router;
