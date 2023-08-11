const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5001;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ckrddue.mongodb.net/`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run(){
    try{

        const allCategory = client.db('jobTask').collection('category');



        app.get('/allCategory', async (req, res) => {
            const query = {}
            const result = await allCategory.find(query).toArray()
            res.send(result)
        })







        app.post('/allCategory', async (req, res) => {
            const home = req.body
            const result = await allCategory.insertOne(home)
            res.send(result)
        })















        app.delete('/allCategory/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await allCategory.deleteOne(query)
            res.send(result)
        })













        app.get('/allHome/:id', async (req, res) => {
            const id = req.params.id
            console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await allHome.findOne(query)
            res.send(result)
        })
      
        app.put('/allHome-update/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const products = req.body
            console.log(products);
            const options = {upsert: true}
            const updatedProducts = {
                $set: {
                    name: products.name,
                    price: products.price,
                    image: products.image,
                    type: products.type,
                    category_id: products.category_id,
                    validation: products.validation
                    
                }
            }
            const result = await allHome.updateOne(filter, updatedProducts, options)
            res.send(result)
           
        })
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await usersCollections.deleteOne(query)
            res.send(result)
        })


    }
    finally{

    }
}
run().catch(console.log())

app.get('/', async(req, res) => {
    res.send('server run')
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})