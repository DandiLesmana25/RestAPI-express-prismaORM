const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const port = process.env.PORT;

// middleware body parser
app.use(express.json());


app.get('/', (req, res)=> {
    res.send("Welcome To My API")
})

app.get('/products', async (req, res)=> {
    const products = await prisma.product.findMany();
    res.send(products);
})

// product by id
app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(productId),
        }
    })

    if (!product) {
        res.status(400).send("product does not exist");  
        return
    }

  

    res.status(200).send({
        data: product,
        message: 'success'
    })

})

app.post('/products', async (req, res) => {
    const newProduct = req.body;

    const product = await prisma.product.create({
        data: {
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description,
            image: newProduct.image,
        }
    });

    res.status(201).send({
        data: product,
        message: "created succes"
    });

})

app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id; // format id masih string

    await prisma.product.delete({
        where: {
            id: parseInt(productId),
        },
    })

    res.send("deleted product: " + productId)

})
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id; // format id masih string
    const productData = req.body;

    if (!(productData.name && productData.image && productData.description && productData.price)) {
        return res.status(400).send("semua fileds wajib di isi");
    }

    const product = await prisma.product.update({
        where: {
            id: parseInt(productId),
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image,
        }
    })

    res.send({
        data: product,
        message: "edit product succesfull"
    })

})

app.patch('/products/:id', async (req, res) => {
    const productId = req.params.id; // format id masih string
    const productData = req.body;

    const product = await prisma.product.update({
        where: {
            id: parseInt(productId),
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image,
        }
    })

    res.send({
        data: product,
        message: "edit product succesfull"
    })

})

app.listen(port, () => {
    console.log("server running di port: " + port);
})