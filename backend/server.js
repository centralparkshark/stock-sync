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

// possible routes 
// main views:
// - home page
// - compare page (/inventory)
    // single search bar that searches both at the same time
// - shopify (/inventory/shopify)
    // items missing any fields, price updates, low stock warnings
// - tam (/inventory/tam)
    // - downloaded csv, low stock warnings (prompt to reorder)
// - indiviudal item pages (/inventory/:key)

// CRUD Routes for CSV creator to upload to Shopify
// CREATE (POST)
    // new db for objects to be posted on shopify
// READ (GET)
    // all searches, inventory pages, will need to figure out pagination
// UPDATE (PATCH)
    // hand edit with needed fields (upload photo? might be too difficult)
// DELETE (DELETE)
    // delete mistakes from CSV uploaded

// do we know what happens if i accidentally make aa duplicate item on shopify?
// all need to be in draft mode so i have to double check before publishing

