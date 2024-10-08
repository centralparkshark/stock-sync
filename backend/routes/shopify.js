import { Router } from "express";
// import model here

const router = Router();

// /shopify
router.get('/', async (req, res) => {
    try {
        res.status(200).json('GET /shopify')
    } catch(e) {
        res.status(400).json(e)
    }
})

// /shopify:id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        // const results = await
        res.status(200).json({'GET /shopify:id,': id})
    } catch(e) {
        res.status(400).json(e)
    }
})

export default router;