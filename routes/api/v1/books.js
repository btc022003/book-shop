var express = require('express')
var router = express.Router()
var BookDal = require('../../../common/book').BookDal
var bookDal = new BookDal()

//无条件的返回数据
router.get('/',(req,res)=>{
    //bookDal.getData({type:req.query.type},data=>{
    //    // res.json({status:'y',msg:'获取数据成功',data:data})
    //    res.json(data)
    //})
    var page = 1//页码
    if(req.query.page){
        page = Number(req.query.page)
    }
    bookDal.getDataByPage(page,{type:req.query.type},data=>{
        setTimeout(function(){
            res.json(data.res)
        },5000)
        // res.json(data.res)
    })
})

//获取分页数量
router.get('/get_page_count',(req,res)=>{
    var page = 1//页码
    if(req.query.page){
        page = Number(req.query.page)
    }
    bookDal.getDataByPage(page,{type:req.query.type},data=>{
        res.json(data)
    })
})

//根据id获取单条记录
// /api/v1/books/....
router.get('/:id',(req,res)=>{
    bookDal.findByID(req.params.id,data=>{
        // data = data.toJSON()
        // delete data.__v
        // res.json({status:'y',msg:'获取数据成功',data:data})
        res.json(data)
    })
})
//根据id更新一条记录
router.put('/:id',(req,res)=>{
    console.log(req.body)
    delete req.body._id //删除不需要修改的数据
    delete req.body.__v	//删除不需要修改的数据
    bookDal.updateByID(req.params.id,req.body,isOk=>{
        // if(isOk){
        // 	res.json({status:'y',msg:'修改数据成功',data:req.body})
        // }
        res.json(req.body)
    })
})
//新增记录
router.post('/',(req,res)=>{
    // 判断当前传递过来的数据是否有type属性 如果没有为其添加一个type为other
    if(req.body.type){
    }
    else{
        req.body.type = 'other'
    }
    bookDal.save(req.body,(isOK,data)=>{
        if(isOK){
            // res.json({status:'y',msg:'新增数据成功',data:data})
            res.json(data)
        }
    })
})
//根据id删除记录
router.delete('/:id',(req,res)=>{
    bookDal.del(req.params.id,isOK=>{
        // res.json({status:'y',msg:'删除数据成功',data:{}})
        res.json({})
    })
})
module.exports = router
