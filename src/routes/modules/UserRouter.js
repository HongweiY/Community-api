import Router from 'koa-router'
import UserController from '../../api/UserController'

const router = new Router()
router.prefix('/user')

router.get('/sign', UserController.userSign)
router.post('/updateUserInfo', UserController.updateUserInfo)

export default router
