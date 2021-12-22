import mongoose from '../config/DBHelpler'
import moment from 'moment'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  uid: { type: String, ref: 'users' },
  title: { type: String },
  content: { type: String },
  created: { type: Date },
  catalog: { type: String },
  fav: { type: String },
  isEnd: { type: String },
  reads: { type: Number },
  answer: { type: Number },
  status: { type: String },
  isTop: { type: String },
  sort: { type: String },
  tags: { type: Array }
})

PostSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

PostSchema.statics = {
  /**
     * 获取文章列表
     * @param options 筛选条件
     * @param sort 排序
     * @param page 页数
     * @param limit 每页数量
     * @returns {*}
     */
  getList: function (options, sort, page, limit) {
    return this.find(options)
      .sort({ [sort]: -1 })
      .skip(page * limit)
      .limit(limit)
      . populate({
        path: 'uid',
        select: 'nickname'
      })
  }
}

const PostModel = mongoose.model('post', PostSchema)

export default PostModel