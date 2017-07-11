// 用来处理blog信息的页面关系
var express = require('express')
var router = express.Router()

var BlogTypeDal = require('../../common/blog_type').BlogTypeDal
var BlogDal = require('../../common/blog').BlogDal
var dalBlog = new BlogDal()
var dalBlogType = new BlogTypeDal()
// var dalBook = require('../../common/db').dal_book
// var dalBookType = require('../../common/db').dal_book_type

// :page? 可选参数page用于记录当前显示哪一页的数据
router.get('/list/:page?',(req,res)=>{
    // var searchName = ""
    var filter = {}
    if(req.query.blogName){
        var searchName = req.query.blogName //获取查询条件
        filter.title = new RegExp(searchName,"i")
    }

    var page = 1 //当前显示第几页的数据
    if(req.params.page){
        page = Number(req.params.page)
    }

    dalBlog.getDataByPage(page,filter,data=>{
        // console.log(data)
        var arrPages = global.tools.getPagesArr(page,data.pageCount) //生成分页页码数组
        // for(var i=1;i<=data.pageCount;i++){
        // 	arrPages.push(i)
        // }
        // console.log(arrPages)
        //console.log(data.res[0])
        res.render('admin/blog/list',{
            list:data.res,
            pages:arrPages, //页面中显示的分页页码
            pageCount:data.pageCount, //总页数
            pageIndex:page, //当前页码
            query:req.query
        })
    })

    // dalBook.getData(searchName,data=>{
    // 	// console.log(data[0].book_type)
    // 	res.render('admin/book/list',{list:data,query:req.query})
    // })
})

// 新增页面
router.get('/add',(req,res)=>{
    dalBlogType.getData("",data=>{
        res.render('admin/blog/add',{types:data})
    })
})
// 新增数据表单提交
router.post('/create',(req,res)=>{
    console.log(req.body)
    dalBlog.save(req.body,function(isOK){
        if(isOK){
            res.redirect('/admin/blog/list') //页面跳转
        }
        else{
            //错误处理
        }
    })
})

router.post('/del',(req,res)=>{
    dalBlog.del(req.body.id,isOK=>{
        if(isOK){
            res.redirect('/admin/blog/list')
        }
        else{
            //错误处理
        }
    })
})

//修改指定的记录
router.get('/edit/:id',(req,res)=>{
    var id = req.params.id
    dalBlogType.getData("",data=>{
        dalBlog.findByID(id,function(model){
            //res.json(model)
            //console.log(model.type)
            res.render('admin/blog/edit',{model:model,types:data})
        })
    })
})

router.post('/update/:id',(req,res)=>{
    var id = req.params.id
    dalBlog.updateByID(id,req.body,function(isOK){
        if(isOK){
            res.redirect('/admin/blog/list')
        }
        else{
            //错误处理
        }
    })
})

module.exports = router
