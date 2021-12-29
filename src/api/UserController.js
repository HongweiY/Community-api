import UserModel from '../model/User'
import SignRecord from '../model/SignRecord'
import { getJWTPayload } from '../common/Utils'
import dayjs from 'dayjs'

class UserController {
  async userSign (ctx) {
    const userObj = await getJWTPayload(ctx.header.authorization)
    const signRecord = await SignRecord.findByUid(userObj._id)
    const user = await UserModel.findById(userObj._id)
    let newRecord = {}
    let result = {}
    if (signRecord !== null) {
      // 是否连续签到
      if (dayjs(signRecord.created).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
        // 今日已经签到
        ctx.body = {
          code: 500,
          msg: '今日已经签到',
          favs: user.favs,
          count: user.count,
          lastsign: signRecord.created
        }
        return
      } else {
        let favs = 0
        const count = user.count
        if (dayjs(signRecord.created).format('YYYY-MM-DD') === dayjs().subtract(1, 'days').format('YYYY-MM-DD')) {
        // 连续签到
          switch (true) {
            case count < 5:
              favs = 5
              break
            case count >= 5 && count <= 15:
              favs = 10
              break
            case count > 15 && count <= 30:
              favs = 15
              break
            case count > 30 && count <= 100:
              favs = 20
              break
            case count > 100 && count <= 365:
              favs = 25
              break
            case count > 365:
              favs = 30
              break
          }
          await UserModel.updateOne({ _id: userObj._id }, {
            $inc: { favs: favs, count: 1 }
          })
          result = {
            favs: user.favs + favs,
            count: user.count + 1,
            lastsign: signRecord.created
          }
        } else {
          // 中断了签到
          favs = 5
          await UserModel.updateOne({ _id: userObj._id }, {
            $set: { count: 1 },
            $inc: { favs: favs }
          })
          result = {
            favs: user.favs + favs,
            count: 1,
            lastsign: signRecord.created
          }
        }
        newRecord = new SignRecord({
          uid: userObj._id,
          favs: favs
        })
        await newRecord.save()
      }
    } else {
      // 第一次签到
      await UserModel.updateOne({
        _id: userObj._id
      }, {
        $set: { count: 1 },
        $inc: { favs: 5 }
      })

      newRecord = new SignRecord({
        uid: userObj._id,
        favs: 5,
        lastsign: signRecord.created
      })
      await newRecord.save()
      result = {
        favs: user.favs + 5,
        count: 1
      }
    }
    ctx.body = {
      code: 200,
      msg: '签到成功',
      ...result

    }
  }
}

export default new UserController()
