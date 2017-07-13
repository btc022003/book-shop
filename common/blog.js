var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema

//创建数据结构
var BlogSchema = new Schema({
    title:String,
    img:String,
    type:{
    	type:Schema.Types.ObjectId,
    	ref:'blog_type'
    },
    view_times:Number,
    description:String,
    content:String,
    created_at:{
        type:Date,
        default:Date.now //对象创建时间
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
})
var Blog = mongoose.model("blog",BlogSchema)

/**
 * 模型
 */
class BlogDal extends DBBase{
    constructor(){
        super(Blog)
    }
    getDataByPage(page,filter,callback){
        var pageSize = global.pageSize //每页显示的数量
        this.model.count(filter) //统计记录数量
            .then(count=>{
                // console.log(count)
                var pageCount = Math.ceil(count/pageSize)
                if(page>pageCount){ //防止页码超出范围
                    page=pageCount
                }
                // 防止查询不到结果的时候page值变为0导致skip跳过的参数为负数
                if(page<=0){
                    page = 1
                }
                this.model.find(filter) //根据条件进行查询
                    .limit(pageSize)
                    .skip(pageSize*(page-1))
                    .populate('type')
                    .sort({_id:-1})
                    .then(res=>{
                        //返回两个数据 总页数和查询结果
                        callback({pageCount:pageCount,res:res})
                    })
                    .catch(err=>{
                        console.log(err)
                        callback({pageCount:0,res:[]})
                    })
            }).catch(err=>{
                callback({pageCount:0,res:[]})
            })
    }

}

module.exports = {
    Blog:Blog,
    BlogDal:BlogDal
}
