var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema
//创建book集合的数据结构
var bookSchema = new Schema({
    title:String,//标题
    author:String,//作者
    publisher:String,//出版社
    img:String,//封面图
    link:String,//链接
    price:{
        type:Number,
        default:0
    },//价格
    type:String//分类
})
// 通过virtual创建虚拟链接
bookSchema.virtual('book_type',{
    ref:"book_type",
    localField:"type",
    foreignField:"code"
})
var Book = mongoose.model('book',bookSchema) //创建book模型

/**
 * 书籍模型
 */
class BookDal extends DBBase{
    constructor(){
        super(Book)
    }
}

module.exports = {
    Book:Book,
    BookDal:BookDal
}
