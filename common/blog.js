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
var Blog = mongoose.model("blog",blogSchema)

/**
 * 模型
 */
class BlogDal extends DBBase{
    constructor(){
        super(Blog)
    }
}

module.exports = {
    Blog:Blog,
    BlogDal:BlogDal
}
