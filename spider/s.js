var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/book_shop")//连接数据库
var Schema = mongoose.Schema
//创建book集合的数据结构
var bookSchema = new Schema({
    title:String,//标题
    author:String,//作者
    publisher:String,//出版社
    img:String,//封面图
    link:String,//链接
    price:{
        type:Number,
        default:0
    },//价格
    type:String//分类
})
var Book = mongoose.model('book',bookSchema) //创建book模型

var fs = require('fs') //引入文件系统模块
var Crawler = require('crawler') //引入数据抓取模块
//创建实例
var c = new Crawler({
    maxConnections: 10
})

var bookList = [{
    url:'http://bang.dangdang.com/books/newhotsales/01.41.00.00.00.00-recent7-0-0-1-',
    name:'儿童',
    code:'ertong',
    pageCount:'1'
},{
    url:'http://bang.dangdang.com/books/newhotsales/01.25.00.00.00.00-recent7-0-0-1-',
    name:'经济',
    code:'jingji',
    pageCount:'1'
}]
bookList.forEach(item=>{
    //getBooks(item.code,item.url,item.pageCount)
})
Book.find({})
    .then(res=>{
        console.log(res)
    })
/**
 * 获取不同的分类的书籍信息
 *
 */
function getBooks(type, url, pageCount) {
    getBookData(url,1,pageCount)
    var books = [] //存储当前的书籍数据
    /**
     * baseUrl      基础地址 用于拼接实际的地址时使用
     * page         当前页码
     * pageCount    总页数
     */
    function getBookData(baseUrl, page, pageCount) {
        var url = baseUrl + page //实际取数据的地址
        c.queue([
            {
                uri: url,//'http://bang.dangdang.com/books/newhotsales/01.00.00.00.00.00-recent7-0-0-1-1',
                callback: function (error, res, done) {
                    if (error) {
                        console.log(error);
                    } else {
                        var $ = res.$;
                        $('.bang_list li').each(function () {
                            //解析book数据存储在数组中
                            var temBook = convertToBook($(this))
                            temBook.type = type
                            books.push(temBook)
                        })
                        if (page <= pageCount) {
                            //递归调用取数 直到最后一页
                            getBookData(baseUrl, page + 1, pageCount)
                        }
                        else {
                            //console.log(books)
                            // fs.writeFileSync(`./data/book_${type}.json`, JSON.stringify(books))
                            // console.log(`写入文件完成...book_${type}.json`)
                            // 此处把数据写入数据库
                            // books.forEach(book=>{
                            //     var model = new Book(book)
                            //     model.save().then(()=>{
                            //         console.log(`保存<<${book.title}>>成功`)
                            //     }).catch(err=>{
                            //         console.log(err)
                            //     })
                            // })
                        }
                    }
                    done();
                }
            }
        ])
    }
}


/**
 *把html节点转换为book对象
 * */
function convertToBook(tagBook) {
    var obj = {}
    obj.title = tagBook.find('.name a').text()
    obj.author = tagBook.find('.publisher_info').eq(0).find('a').attr('title')
    obj.img = tagBook.find('.pic img').attr('src')
    obj.link = tagBook.find('.pic a').attr('href')
    //转换价格数据为数字值
    //js中字符串转换为数字 *1或者Number(str)
    obj.price = tagBook.find('.price_n').eq(0).text().replace('¥', '') * 1
    obj.publisher = tagBook.find('.publisher_info').eq(1).find('a').text()
    //books.push(obj)
    return obj
}

