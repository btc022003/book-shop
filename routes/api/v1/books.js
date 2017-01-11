var express = require('express')
var router = express.Router()

router.get('/get_data',(req,res)=>{
	setTimeout(function(){
		res.json({
			status:'y',
			msg:'请求成功',
			data:[]
		})
	},5000)
})

module.exports = router