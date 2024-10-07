import express from 'express'
const app = express();
app.use(express.json())
const PORT = 8080;

app.get('/test', (req, res) => {
    res.json("Testing!")
})

app.get('/', (req, res) => {
    res.json("home!")
})

app.listen(PORT, () => {
    console.log('Listening on Port' + PORT)
})