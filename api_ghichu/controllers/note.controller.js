const note = require('../models/users.model')

exports.list = async (req,res,next) =>{
    var nos = await note.userModel.find();

    res.render('sanpham/note', {list:nos})
}