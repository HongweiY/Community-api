import combineRoutes from 'koa-combine-routers'

import publicRouter from './PublicRouter'
import LoginRouter from './LoginRouter'
import UserRouter from './UserRouter'

export default combineRoutes(publicRouter, LoginRouter, UserRouter)
