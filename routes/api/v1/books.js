var express = require('express')
var router = express.Router()
var BookDal = require('../../../common/book').BookDal
var bookDal = new BookDal()

router.get('/get_data',(req,res)=>{
	bookDal.getData({type:"ertong"},books=>{
		res.json({
			status:'y',
			msg:'请求成功',
			data:books
		})
	})
	// setTimeout(function(){
	// 	res.json({
	// 		status:'y',
	// 		msg:'请求成功',
	// 		data:[]
	// 	})
	// },5000)
})
//根据id获取单条记录
// /api/v1/books/....
router.get('/:id',(req,res)=>{
	bookDal.findByID(req.params.id,data=>{
		// data = data.toJSON()
		// delete data.__v
		res.json({status:'y',msg:'获取数据成功',data:data})
	})
})
//根据id更新一条记录
router.put('/:id',(req,res)=>{
	console.log(req.body)
	delete req.body._id //删除不需要修改的数据
	delete req.body.__v	//删除不需要修改的数据
	bookDal.updateByID(req.params.id,req.body,isOk=>{
		if(isOk){
			res.json({status:'y',msg:'获取数据成功',data:req.body})
		}
	})
})
module.exports = router