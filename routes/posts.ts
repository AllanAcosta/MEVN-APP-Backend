import routerx from "express-promise-router"
import postsController from "../controllers/postsController"

const router = routerx()

router.post("/add", postsController.add)
router.get("/query", postsController.query)
router.get("/list", postsController.list)
router.put("/update", postsController.update)
router.delete("/remove", postsController.remove)
router.put("/activate", postsController.activate)
router.put("/deactivate", postsController.deactivate)

export default router
