var db = require('./db');
const userSchema = new db.mongoose.Schema({
    title: { type: String, required: true },
    notes: { type: String, required: true },
    date:{type:String,required:true}, 
}, { collection: 'users' });
let userModel = db.mongoose.model('userModel', userSchema);
module.exports = {
    userModel
}