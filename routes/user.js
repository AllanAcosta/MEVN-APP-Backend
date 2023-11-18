import routerx from "express-promise-router"
import userController from "../controllers/userController"
import auth from "../middlewares/auth"

const router = routerx()

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/auth", userController.userAuth)

router.get("/query", auth.verifyUser, userController.query)
router.get("/list", auth.verifyUser, userController.list)
router.put("/update", auth.verifyUser, userController.update)
router.delete("/remove", auth.verifyUser, userController.remove)
router.put("/activate", auth.verifyUser, userController.activate)
router.put("/deactivate", auth.verifyUser, userController.deactivate)

export default router
