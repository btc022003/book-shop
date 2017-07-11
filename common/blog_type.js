var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema

//创建商品分类数据结构
var blogTypeSchema = new Schema({
    name:String,
    description:String,
    created_at:{
        type:Date,
        default:Date.now //对象创建时间
    },
    updated_at:{
        type:Date,
        default:Date.now
    }

})
var BlogType = mongoose.model("blog_type",blogTypeSchema)

/**
 * 分类模型
 */
class BlogTypeDal extends DBBase{
    constructor(){
        super(BlogType)
    }
}

module.exports = {
    BlogType:BlogType,
    BlogTypeDal:BlogTypeDal
}
