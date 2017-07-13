var express = require('express')
var router = express.Router()
var BlogTypeDal = require('../../../common/blog_type').BlogTypeDal
var blogTypeDal = new BlogTypeDal()
router.get('/all_type',(req,res)=>{
	blogTypeDal.getData({},data=>{
		res.json({status:'y',msg:'获取所有数据成功',data:data})
	})
})
module.exports = router