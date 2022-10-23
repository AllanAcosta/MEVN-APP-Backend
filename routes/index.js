import routerx from 'express-promise-router'
import categoriaRouter from './categoria'
import articuloRouter from './articulo'
import authRoutes from './auth'

const router=routerx()

router.use('/user', authRoutes)
router.use('/categoria' ,categoriaRouter)
router.use('/articulo' ,articuloRouter)

export default router