//创建数据库部分内容
var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/student_db")

var Schema = mongoose.Schema

//创建书籍分类数据结构
var bookTypeSchema = new Schema({
	name:String,
	code:String,
	url:String,
	page_count:NUmber
})
var BookType = mongoose.model("book_type",bookSchema)
//书籍分类的相关操作方法
var db_book_type = {}
db_book_type.getData = function(searchName,callback){
	var filter = new RegExp(searchName,"i")
	BookType.find(filter)
		.then(res=>{
			callback(res)
		})
		.catch(err=>{
			console.log(err)
		})
}
db_book_type.save = function(model,callback){
	var data = new BookType(model)
	data.save()
		.then(callback(true))
		.catch(err=>{
			console.log(err)
			callback(false)
		})
}
db_book_type.updateByID = function(id,model,callback){
	BookType.findByIdAndUpdate('id',model)
		.then(callback(true))
		.catch(err=>{
			console.log(err)
			callback(false)
		})
}
db_book_type.del = function(id,callback){
	BookType.findByIdAndRemove(id)
		.then(callback(true))
		.catch(err=>{
			console.log(err)
			callback(false)
		})
}
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
var Book = mongoose.model('book',bookSchema) //创建book模型

//书籍分类的相关操作方法
var db_book = {}
db_book.getData = function(searchName,callback){
	var filter = new RegExp(searchName,"i")
	Book.find(filter)
		.then(res=>{
			callback(res)
		})
		.catch(err=>{
			console.log(err)
		})
}
db_book.save = function(model,callback){
	var data = new db_book(model)
	data.save()
		.then(callback(true))
		.catch(err=>{
			console.log(err)
			callback(false)
		})
}
db_book.updateByID = function(id,model,callback){
	db_book.findByIdAndUpdate('id',model)
		.then(callback(true))
		.catch(err=>{
			console.log(err)
			callback(false)
		})
}
db_book.del = function(id,callback){
	db_book.findByIdAndRemove(id)
		.then(callback(true))
		.catch(err=>{
			console.log(err)
			callback(false)
		})
}
db_book.findByID = function(id,callback){
	db_book.findById(id)
		.then(res=>{
			callback(res)
		})
		.catch(err=>{
			console.log(err)
			callback(null)
		})
}

var db = {}
db.dal_book = book //导出book操作相关的方法
db.dal_book_type = book_type //导出book_type操作相关的方法
module.exports = db



