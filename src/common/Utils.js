import { getValue } from '../config/RedisConfig'
import jwt from 'jsonwebtoken'
import config from '../config/index'

const getJWTPayload = token => {
  return jwt.verify(token.split(' ')[1], config.JWT_SECRET)
}

const checkCode = async (key, value) => {
  let code = ''

  await getValue(key).then((res) => {
    code = res
  })
  if (code !== null) {
    if (code.toLowerCase() === value.toLowerCase()) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export {
  checkCode,
  getJWTPayload
}
