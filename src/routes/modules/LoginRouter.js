import Router from 'koa-router'
import loginController from '../../api/LoginController'

const router = new Router()
router.post('/forget', loginController.forget)
router.post('/login', loginController.login)
router.post('/register', loginController.register)

export default router
