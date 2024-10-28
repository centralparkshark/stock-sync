import express from 'express'
import { tamRouter } from './routes/mongo_controller.js';
import { shopifyRouter } from './routes/shopify_controller.js';
import connectToDb from './db.js';
import cors from 'cors'


const app = express();
const PORT = 8080;

connectToDb();

// app.use(cors({origin: 'https://stock-sync.vercel.app'})) // front end for production
app.use(cors())
app.use(express.json())
app.use("/shopify", shopifyRouter)
app.use("/tam", tamRouter)

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

