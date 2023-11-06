import {Router} from 'express'
const router = Router()
router.get('/hello', (req,res)=> res.send("hello from user.routes.ts"))

export default router
