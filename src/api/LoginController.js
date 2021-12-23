import send from '../config/MailConfig'
import moment from 'dayjs'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/index'
import { checkCode } from '../common/Utils'
import User from '../model/User'
import bcrypt from 'bcrypt'

class LoginController {
  async forget (ctx) {
    const { body } = ctx.request
    try {
      const result = await send({
        code: '1234',
        expire: moment().add(30, 'm').format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'YHW'
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
     * 用户登录
     * @param ctx
     * @returns {Promise<void>}
     */
  async login (ctx) {
    const { body } = ctx.request

    const { sid, code } = body

    // 验证码检测
    let codeCheck = ''

    await checkCode(sid, code).then(res => {
      codeCheck = res
    })

    if (codeCheck) {
      // 验证用户名密码
      const user = await User.findOne({ username: body.username })
      let userCheck = false
      if (await bcrypt.compare(body.password, user.password)) {
        userCheck = true
      }
      if (userCheck) {
        const token = jsonwebtoken.sign({ _id: 'YHW' }, config.JWT_SECRET, { expiresIn: '24h' })
        ctx.body = {
          code: 200,
          token: token
        }
      } else {
        ctx.body = {
          code: 404,
          msg: '用户名密码错误'
        }
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '验证码错误，请检查！'
      }
    }
  }

  async register (ctx) {
    const { body } = ctx.request
    // 检验验证码
    const { sid, code } = body
    const msg = {}
    let checkCodeResult = false
    await checkCode(sid, code).then(res => {
      if (res) {
        checkCodeResult = true
      }
    })

    // 检测用户名或者昵称是否重复
    if (checkCodeResult) {
      let canReg = true
      const userUsername = await User.findOne({ username: body.username })
      if (userUsername !== null && typeof userUsername.username !== 'undefined') {
        msg.username = '此邮箱已经注册，请使用邮箱找回密码'
        canReg = false
      }
      const userNickname = await User.findOne({ nickname: body.nickname })
      if (userNickname !== null && typeof userNickname.nickname !== 'undefined') {
        msg.username = '此昵称已经存在，请更换一个独一无二的吧'
        canReg = false
      }
      if (canReg) {
        const bPassword = await bcrypt.hash(body.password, 5)
        const user = new User({
          username: body.username,
          nickname: body.nickname,
          password: bPassword,
          createTime: moment().format('YY-MM-DD HH:mm:ss')
        })
        console.log(user)

        const result = user.save()
        if (result) {
          ctx.body = {
            code: 200,
            data: result,
            msg: '注册成功'
          }
        } else {
          ctx.body = {
            code: 500,
            data: result,
            msg: '哎呀，服务器出错了'
          }
        }
        return
      }
    } else {
      msg.code = ['验证码已经过期，请刷新']
    }
    ctx.body = {
      code: 500,
      msg: msg
    }
  }
}

export default new LoginController()
