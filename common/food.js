var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema

//创建商品分类数据结构
var foodSchema = new Schema({
    name:String,
    img:String,
    type:{
    	type:Schema.Types.ObjectId,
    	ref:'food_type'
    },
    price:Number,
    description:String
})
var Food = mongoose.model("food",foodSchema)

/**
 * 食物商品模型
 */
class FoodDal extends DBBase{
    constructor(){
        super(Food)
    }
}

module.exports = {
    Food:Food,
    FoodDal:FoodDal
}
