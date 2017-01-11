/**
 * 测试代码 测试模型是否可用
 */
var BookTypeDal = require('./common/book_type').BookTypeDal
var BookDal = require('./common/book').BookDal
var dal = new BookTypeDal()
var dalBook = new BookDal()

// console.log(dal)
// console.log(dalBook)
dal.getData("",res=>{
	console.log(res[0])
})
dal.getDataByName("儿童",res=>{
	console.log(res)
})
dalBook.getData("",res=>{
	console.log(res[0])
})
// dalBook.getDataByName("经济学思维",res=>{
// 	console.log(res)
// })

