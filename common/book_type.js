var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema

//创建书籍分类数据结构
var bookTypeSchema = new Schema({
    name:String,
    code:String,
    url:String,
    page_count:Number
})
var BookType = mongoose.model("book_type",bookTypeSchema)

/**
 * 分类模型
 */
class BookTypeDal extends DBBase{
    constructor(){
        super(BookType)
    }

    getDataByName(name,callback){
        this.model.findOne({
            name:name
        }).then(res=>{
            callback(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    /**
     * 验证code是否已经存砸
     * @param  {[type]}   code     书籍编码
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */
    validateCode(code,callback){
        this.model.count({
            code:code
        }).then(res=>{
            if(res>0){//表示当前code已经存在
                callback(false)
            }
            else{
                callback(true)
            }
        }).catch(err=>{
            console.log(err)
            callback(false)
        })
    }
}

module.exports = {
    BookType:BookType,
    BookTypeDal:BookTypeDal
}
