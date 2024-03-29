import routerx from "express-promise-router"
import userController from "../controllers/userController"

const router = routerx()

router.post("/login", userController.login)

router.post("/add", userController.add)
router.get("/query", userController.query)
router.get("/list", userController.list)
router.put("/update", userController.update)
router.delete("/remove", userController.remove)
router.put("/activate", userController.activate)
router.put("/deactivate", userController.deactivate)

export default router
