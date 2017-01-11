//创建数据库部分内容
var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/student_db")

var Schema = mongoose.Schema

//创建学生模型
var studentSchema = new Schema({
	name:String,
	gender:String,
	age:Number,
	hobby:String
})
var Student = mongoose.model("student",studentSchema)

var db = {}	//创建一个空对象,用于最终进行模块导出

/**
 * 从文件中读取数据
 * @param  {String}	  searchName [查询条件name]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [void]
 */
db.getData = function(searchName,callback){
	var filter = {} //筛选条件
	if(searchName){
		// new RegExp() //创建一个正则表达式对象 此处的参数i表示不区分大小写
		filter.name = {$regex:new RegExp(searchName,'i')}
	}
	Student.find(filter)
		.then(res=>{
			callback(res)
		})
		.catch(err=>{
			console.log(err)
		})
}

//保存数据到文件
/**
 * 保存文件到数据
 * @param  {[type]}   model    [需要保存的数据]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [void]
 */
db.save = function(model,callback){
	var student = new Student(model)
	console.log(student)
	student.save()
		.then(callback(true))
		.catch(err=>{
			console.log(err)
			callback(false)
		})
}
/**
 * 根据id删除指定对象
 * @param  {int} delID    [需要删除的id]
 * @param  {[function]} callbacl [执行之后的回调函数]
 * @return {[type]}          [description]
 */
db.del = function(delID,callback){
	Student.findByIdAndRemove(delID)
		.then(callback(true))
		.catch(err=>{
			console.log(err)
			callback(false)
		})
}

/**
 * 根据id查找元素
 * @param  {int}   id       [用于查找的id]
 * @param  {Function} callback [查找成功后的回调函数]
 * @return {[type]}            [description]
 */
db.findByID = function(id,callback){
	Student.findById(id)
		.then(res=>{
			callback(res)
		})
		.catch(err=>{
			console.log(err)
		})
}

/**
 * 根据id进行修改
 * @param  {int}   id       需要修改的对象的id
 * @param  {Object}   data     修改后的属性信息
 * @param  {Function} callback 回调函数
 * @return {void}            无返回值
 */
db.updateByID = function(id,data,callback){
	Student.findByIdAndUpdate(id,data)
		.then(callback(true))
		.catch(err=>{
			console.log(err)
			callback(false)
		})
}

module.exports = db