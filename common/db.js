//创建数据库部分内容
var mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/book_shop")

var Schema = mongoose.Schema

//创建书籍分类数据结构
var bookTypeSchema = new Schema({
    name:String,
    code:String,
    url:String,
    page_count:Number
})
var BookType = mongoose.model("book_type",bookTypeSchema)
//书籍分类的相关操作方法
var db_book_type = {}
/**
 * 根据条件查询数据
 * @param  {[type]}   searchName 查询条件
 * @param  {Function} callback   回调函数
 * @return {[type]}              [description]
 */
db_book_type.getData = function(searchName,callback){
    var filter = {}
    if(searchName){
        filter.name = new RegExp(searchName,"i")
    }
    BookType.find(filter)
        .sort({_id:-1})
        .then(res=>{
            callback(res)
        })
        .catch(err=>{
            console.log(err)
        })
}
/**
 * 保存数据
 * @param  {[type]}   model    需要保存的内容
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
db_book_type.save = function(model,callback){
    var data = new BookType(model)
    data.save()
        .then(callback(true))
        .catch(err=>{
            console.log(err)
            callback(false)
        })
}
/**
 * 根据id更新记录
 * @param  {[type]}   id       需要更新的记录id
 * @param  {[type]}   model    需要更新的数据
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
db_book_type.updateByID = function(id,model,callback){
    BookType.findByIdAndUpdate(id,model)
        .then(callback(true))
        .catch(err=>{
            console.log(err)
            callback(false)
        })
}
/**
 * 根据id删除指定的记录
 * @param  {[type]}   id       需要删除的id
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
db_book_type.del = function(id,callback){
    BookType.findByIdAndRemove(id)
        .then(callback(true))
        .catch(err=>{
            console.log(err)
            callback(false)
        })
}
/**
 * 根据id查找单条记录
 * @param  {[type]}   id       查询id
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
db_book_type.findByID = function(id,callback){
    BookType.findById(id)
        .then(res=>{
            callback(res)
        })
        .catch(err=>{
            console.log(err)
            callback(null)
        })
}

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

//书籍分类的相关操作方法
var db_book = {}
db_book.getData = function(searchName,callback){
    var filter = {}
    if(searchName){
        filter.title = new RegExp(searchName,"i")
    }
    Book.find(filter)
        .populate('book_type')
        .sort({_id:-1})
        .then(res=>{
            callback(res)
        })
        .catch(err=>{
            console.log(err)
        })
}
db_book.save = function(model,callback){
    var data = new Book(model)
    data.save()
        .then(callback(true))
        .catch(err=>{
            console.log(err)
            callback(false)
        })
}
db_book.updateByID = function(id,model,callback){
    Book.findByIdAndUpdate(id,model)
        .then(callback(true))
        .catch(err=>{
            console.log(err)
            callback(false)
        })
}
db_book.del = function(id,callback){
    Book.findByIdAndRemove(id)
        .then(callback(true))
        .catch(err=>{
            console.log(err)
            callback(false)
        })
}
db_book.findByID = function(id,callback){
    Book.findById(id)
        .then(res=>{
            callback(res)
        })
        .catch(err=>{
            console.log(err)
            callback(null)
        })
}

var db = {}
db.dal_book = db_book //导出book操作相关的方法
db.dal_book_type = db_book_type //导出book_type操作相关的方法
module.exports = db



