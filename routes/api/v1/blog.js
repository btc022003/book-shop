var express = require('express')
var router = express.Router()
var BlogDal = require('../../../common/blog').BlogDal
var blogDal = new BlogDal()

//获取分页数据
router.get('/',(req,res)=>{
	var page = 1 //分页页码
	if(req.query.page){
		page = Number(req.query.page)
	}
	var filter = {}
	if(req.query.type){
		filter.type = req.query.type
    }
	blogDal.getDataByPage(page,filter,data=>{
		res.json({status:"y",msg:'获取分页数据成功',data:data})
	})
})
module.exports = router