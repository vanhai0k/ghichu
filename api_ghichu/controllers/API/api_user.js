const MyModel = require('../../models/users.model');
exports.listUsers = async (req, res, next) => {
    let dataR = {
        // status: 1,
        // msg: "ok"
    }

    let dieu_kien =null;
    if(typeof(req.query.title)!='undefined'){
        let title =req.query.title;
        dieu_kien={title:title};
        console.log(dieu_kien);
    }
    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.userModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}
exports.addUsers =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "Thanh cong"
    }
    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 
        let objUser = new MyModel.userModel();
        
        objUser.title = req.body.title;
        objUser.notes=req.body.notes;
        objUser.date = new Date();
        
        try{
            let dataR = await objUser.save();
            
            console.log(dataR);

            console.log("Đã ghi thành công");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
    }
    res.json(dataR);
}
exports.deleteUser = async (req,res,next)=>{
    let dataR = {
        status: 1,
        msg: "ok"
    }
    let objUser = await MyModel.userModel.findById(  req.params.id  );
    console.log( objUser);
        
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await MyModel.userModel.findByIdAndDelete({_id:req.params.id});

            console.log("Đã xóa thành công");
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
        res.json(dataR);
        console.log(dataR);
 
}
exports.Updateuser =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='PUT'){

    
        try{
            await MyModel.userModel.updateOne({_id:req.params.id},{
                $set: {
                    title:  req.body.title, 
                    notes:  req.body.notes,
                    date : new Date()
                }});
            console.log(dataR);

            console.log("Đã cập nhật thành công");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
 
    }

    //code xử lý add


    //trả về client
    res.json(dataR)

}