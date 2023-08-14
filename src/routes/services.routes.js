import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.js"
import { validateToken } from "../middlewares/validateToken.js"
import { getServices, getServiceById, getServicesByUserId, postService } from "../controllers/services.controller.js"
import { serviceSchema } from "../schemas/services.schemas.js"


const servicesRouter = Router()

servicesRouter.get("/home", validateToken, getServices)
servicesRouter.get("/perfil/:id", validateToken, getServicesByUserId)
servicesRouter.get("/detalhes/:id", validateToken, getServiceById)
servicesRouter.post("/novoservico", validateToken, validateSchema(serviceSchema), postService)


export default servicesRouter