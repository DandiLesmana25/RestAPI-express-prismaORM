const express = require('express');
const app = express();
const productsControllers = require('./controllers/productsController')
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

// middleware body parser
app.use(express.json());

app.get('/', (req, res)=> {
    res.send("Welcome To My API")
})

app.use("/products", productsControllers);

app.listen(port, () => {
    console.log("server running di port: " + port);
})