import Router from 'koa-router'
import publicController from '../api/PublicController'
import TipsController from '../api/TipsController'
import ContentController from '../api/ContentController'

const router = new Router()

router.prefix('/public')
router.get('/getCaptcha', publicController.getCaptcha)
router.get('/tips', TipsController.getTips)
router.get('/list', ContentController.getPostsList)

export default router
