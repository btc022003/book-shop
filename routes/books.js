// 前台页面用户部分的路由...
var express = require('express')
var router = express.Router()
var BookTypeDal = require('../common/book_type').BookTypeDal
var BookDal = require('../common/book').BookDal
var dalBook = new BookDal()
var dalBookType = new BookTypeDal()
var UserDal = require('../common/user').UserDal
var userDal = new UserDal()

router.get('/types', (req, res) => {
    //查询所有的分类信息 把数据展示在页面上
    dalBookType.getData({}, data => {
        res.render('books/book_types', { types: data })
    })
})

//根据分类获取当前分类下的所有数据
router.get('/list/:type', (req, res) => {
	//不管是否登录都可以查看书籍列表页
    if (req.cookies.userid) {
        userDal.findByID(req.cookies.userid, user => {
            if (user) {//如果登录过
                res.render('books/book_list', { type: req.params.type ,isLogined:1,userid:user.id})
            } else {//没有用户信息
                res.render('books/book_list', { type: req.params.type,isLogined:0 })
            }
        })
    } else {//没有用户信息
        res.render('books/book_list', { type: req.params.type,isLogined:0})
    }
})
router.get('/list.json/:type/:page?', (req, res) => {
    var page = 1
    if (req.params.page) {
        page = req.params.page
    }
    dalBook.getDataByPage(page, { type: req.params.type }, data => {
        res.json({
            status: 'y',
            data: data
        })
    })
})

module.exports = router
