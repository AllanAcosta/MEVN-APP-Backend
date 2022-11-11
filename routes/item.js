import routerx from "express-promise-router"
import itemController from "../controllers/itemController"

const router = routerx()

router.post("/add", itemController.add)
router.get("/query", itemController.query)
router.get("/list", itemController.list)
router.put("/update", itemController.update)
router.delete("/remove", itemController.remove)
router.put("/activate", itemController.activate)
router.put("/deactivate", itemController.deactivate)

export default router
