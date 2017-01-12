var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema

//创建书籍分类数据结构
var userSchema = new Schema({
    name:String,
    mobile:String,
    email:String,
    address:String,
    pwd:String,
    reg_time:{
        type:Date,
        dafault:Date.now
    }
})
var User = mongoose.model("user",userSchema)

/**
 * 分类模型
 */
class UserDal extends DBBase{
    constructor(){
        super(User)
    }

    /**
     * 验证手机号是否可以注册使用
     * @param  {String}   mobile   手机号
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */
    validateMobileCanReg(mobile,callback){
        this.model.count({
            mobile:mobile
        }).then(count=>{
            if(count>0){
                callback(false)
            }
            else{
                callback(true)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
}

module.exports = {
    User:User,
    UserDal:UserDal
}
