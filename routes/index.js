import routerx from "express-promise-router"
import categoryRouter from "./category"
import itemRouter from "./item"
import authRoutes from "./user"

const router = routerx()

router.use("/category", categoryRouter)
router.use("/item", itemRouter)
router.use("/user", authRoutes)

export default router
