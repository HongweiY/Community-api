import combineRoutes from 'koa-combine-routers'

import publicRouter from './PublicRouter'
import LoginRouter from './LoginRouter'


export default combineRoutes(publicRouter,LoginRouter)
