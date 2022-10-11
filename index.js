const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const { MongoClient } = require ("mongodb");
require('dotenv').config();

//CLIENT MONGODB
const client = new MongoClient(process.env.URL);

const dbName = process.env.DBNAME;
const collection = process.env.COLLECTION;

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));
app.use(bodyParser.json());

//ROOT ROUTE
app.get("/", (req, res) => {
    res.status(300).redirect('/info.html');
});








/**
 * GET-REQUEST ALL My WORKS FROM API
 * 
 * @param client - getting connection with db as client
 * @returns all books from api
 * 
 */
app.get("/works", async (req, res) => {


    try{
        //CONNECTION MONGDB
        await client.connect();

        //DATA FROM COLLECTION BOOKAPI  
        const colli = client.db(dbName).collection("works");
        const books = await colli.find({}).toArray();


        //GETTIN JSON FILE BACK
        res.status(200).send(books);

    }catch(error){
        console.log(error);
        res.status(500).send({
            err: "File doesn't excist. Come back later",
            value: error
        });
    }
    //CLOSING CONNECTION WITH DB
    finally{
        await client.close();
    }

});








/**
 * LISTENING TO PORT
 * 
 * @param port - setting port for localhost
 * @returns message: "Running at port: ${port}"
 * 
 */
app.listen(port, (err) => {
    if (!err){
        console.log(`Running at port: ${port}`);
    }
    else{
        console.error(err);
    }
});