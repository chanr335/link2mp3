import {Request, Response, Router} from 'express';
const router = Router()

router.get('/hallo', (req:Request, res:Response) => {
    res.send("Get Request")
})

router.post('/test', (req:Request, res:Response) => {
    res.send("Post Request")
})

export default router