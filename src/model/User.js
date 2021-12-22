import mongoose from "../config/DBHelpler";

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {type: String},
    nickname: {type: String},
    password: {type: String},
    createTime: {type: String}
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
