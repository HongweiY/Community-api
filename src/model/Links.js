import mongoose from 'mongoose'
import dayjs from 'dayjs'
const Schema = mongoose.Schema

const LinksSchema = new Schema({
  title: { type: String, default: '' },
  link: { type: String, default: '' },
  type: { type: String, default: 'Link' },
  created: { type: Date },
  isTop: { type: String, default: '0' },
  sort: { type: String, default: '' }

})

LinksSchema.pre('save', function (next) {
  this.created = dayjs().format('YYYY-MM-DD HH:mm:ss')
  next()
})

const LinksModel = mongoose.model('links', LinksSchema)

export default LinksModel
