import mongoose from '../config/DBHelpler'
import dayjs from 'dayjs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, index: { unique: true }, sparse: true },
  password: { type: String },
  name: { type: String },
  created: { type: Date },
  updated: { type: Date },
  favs: { type: Number, default: 100 },
  gender: { type: String, default: '' },
  roles: { type: Array, default: ['user'] },
  pic: { type: String, default: '/img/user.png' },
  mobile: { type: String, match: /^1[3-9] (\d{9})$/, default: '' },
  status: { type: String, default: '0' },
  regmark: { type: String, default: '' },
  location: { type: String, default: '' },
  isVip: { type: String, default: 'O' },
  count: { type: Number, default: 0 }
})

UserSchema.pre('save', function (next) {
  this.created = dayjs().format('YYYY-MM-DD HH:ii:ss')
})
UserSchema.pre('update', function (next) {
  this.updated = dayjs().format('YYYY-MM-DD HH:ii:ss')
})

UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoNError' && error.code === 11000) {
    next(new Error('Error:Mongoose has duplicate key.'))
  } else {
    next(error)
  }
})

UserSchema.statics = {
  findById: function (id) {
    return this.findOne({ _id: id }, {
      password: 0,
      username: 0,
      mobile: 0
    })
  }
}

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
