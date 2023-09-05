var express = require('express');
var router = express.Router();

var apiU = require('../controllers/API/api_user');


var multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function name(req, file, cb) {
        cb(null, file.fieldname + "" + Date.now() + "" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    
}).single('image');



router.get('/users',apiU.listUsers);
router.post('/users',apiU.addUsers);
router.get('/users/:id',apiU.listUsers);
router.put('/users/update/:id',apiU.Updateuser);
router.delete('/users/delete/:id',apiU.deleteUser);

module.exports = router;