const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const schema = require('./schema');
const cors = require('cors');

const { ApolloServer } = require('apollo-server-express');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then((db) => {
    console.log(`Connected correctly to server!`);
}).catch((err) => {
    console.log(err);
})

const server = new ApolloServer({
    schema:schema
})


const app = express();

app.use(express.json());

app.use("*", cors());

server.applyMiddleware({ app });

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Server is Running http://localhost:${port}${server.graphqlPath}`)
})