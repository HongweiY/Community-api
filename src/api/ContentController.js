import Post from '../model/Post'
import Links from '../model/Links'

class ContentController {
  async getPostsList (ctx) {
    const body = ctx.query
    const options = {}
    const sort = body.sort ? body.sort : 'create'
    const page = body.page && body.page > 0 ? parseInt(body.page) : 1
    const limit = body.limit ? parseInt(body.limit) : 20

    if (typeof body.catalog !== 'undefined' && body.catalog !== '') {
      options.catalog = body.catalog
    }
    if (typeof body.isTop !== 'undefined' && body.isTop !== '') {
      options.isTop = body.isTop
    }
    if (typeof body.isEnd !== 'undefined' && body.isEnd !== '') {
      options.isEnd = body.isEnd
    }
    if (typeof body.status !== 'undefined' && body.status !== '') {
      options.status = body.status
    }
    if (typeof body.tag !== 'undefined' && body.tag !== '') {
      options.tags = { $elemMatch: { name: body.tag } }
    }
    const result = await Post.getList(options, sort, page, limit)
    ctx.body = {
      code: 200,
      data: result,
      msg: '查询完成'
    }
  }

  async getLinks (ctx) {
    const result = await Links.find({ type: 'links' })
    ctx.body = {
      code: 200,
      data: result,
      msg: '查询完成'
    }
  }

  async getTips (ctx) {
    const result = await Links.find({ type: 'tips' })
    ctx.body = {
      code: 200,
      data: result,
      msg: '查询完成'
    }
  }

  async getTopWeek (ctx) {
    const result = await Post.getTopWeek()
    ctx.body = {
      code: 200,
      data: result,
      msg: '查询完成'
    }
  }
}

export default new ContentController()
