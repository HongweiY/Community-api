import Router from 'koa-router'
import publicController from '../api/PublicController'
import TipsController from '../api/TipsController'

const router = new Router()

router.prefix('/public')
router.get('/getCaptcha', publicController.getCaptcha)
router.get('/tips', TipsController.getTips)

export default router
