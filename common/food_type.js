var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema

//创建商品分类数据结构
var foodTypeSchema = new Schema({
    name:String,
    description:String
})
var FoodType = mongoose.model("food_type",foodTypeSchema)

/**
 * 分类模型
 */
class FoodTypeDal extends DBBase{
    constructor(){
        super(FoodType)
    }
}

module.exports = {
    FoodType:FoodType,
    FoodTypeDal:FoodTypeDal
}
