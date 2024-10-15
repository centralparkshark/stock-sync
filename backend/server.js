import express from 'express'
import { tamRouter, shopifyRouter } from './routes/controller.js';
import connectToDb from './db.js';
import cors from 'cors'


const app = express();
const PORT = 8080;

connectToDb();

app.use(cors())
app.use(express.json())
app.use("/shopify", shopifyRouter)
app.use("/tam", tamRouter)


// test route
app.get('/test', (req, res) => {
    res.json("Testing!")
})

app.get('/inventory', async (req, res) => {
    try {
        res.status(200).json('GET /inventory')
    } catch(e) {
        res.status(400).json(e)
    }
})

app.get('/', (req, res) => {
    try {
        res.status(200).json('GET /')
    } catch(e) {
        res.status(400).json(e)
    }
})

app.listen(PORT, () => {
    console.log('Listening on Port:', PORT)
})

