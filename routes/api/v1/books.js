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

module.exports = router