import mongoose from "mongoose";

const Schema = mongoose.Schema

const TipsSchema= new Schema({
    title:{type:String},
    link:{type:String},
    pic:{type:String},
    isTop:{type:String},
    sort:{type:String},
    created:{type:String},
})

const TipsModel = mongoose.model('tips',TipsSchema)

export default TipsModel
