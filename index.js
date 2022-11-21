const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const { MongoClient } = require ("mongodb");
require('dotenv').config();
const cors = require('cors');

//CLIENT MONGODB
const client = new MongoClient(process.env.URL, {
    useNewUrlParser: true
});

const dbName = process.env.DBNAME;
const collection = process.env.COLLECTION;

const app = express();
const port = process.env.PORT;

//app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors())

//ROOT ROUTE
app.get("/", (req, res) => {
    res.status(300).redirect('/info.html');
});








/**
 * GET-REQUEST ALL My WORKS FROM API
 * 
 * @param client - getting connection with db as client
 * @returns all projects from api
 * 
 */
app.get("/projects", async (req, res) => {


    try{
        //CONNECTION MONGDB
        await client.connect();

        //DATA FROM COLLECTION BOOKAPI  
        const colli = client.db(dbName).collection("Projects");
        const projects = await colli.find({}).toArray();


        //GETTIN JSON FILE BACK
        res.status(200).send(projects);

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
 * GET-REQUEST ALL My Expert Labs FROM API
 * 
 * @param client - getting connection with db as client
 * @returns all expert lab from api
 * 
 */
app.get("/projects/expertLab", async (req, res) => {


    try{
        //CONNECTION MONGDB
        await client.connect();

        //DATA FROM COLLECTION BOOKAPI  
        const colli = client.db(dbName).collection("Projects");
        const query = { category: "expertLab"}
        const project = await colli.find(query).toArray();



        //GETTIN JSON FILE BACK
        if(project){
            //GETTIN JSON FILE BACK
            res.status(200).send(project);
            return
        }else{
            res.status(500).send("Project with category 'expertLab' is not found ");
        }

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
 * GET-REQUEST ALL My Other Projects FROM API
 * 
 * @param client - getting connection with db as client
 * @returns all expert lab from api
 * 
 */
app.get("/projects/otherProjects", async (req, res) => {


    try{
        //CONNECTION MONGDB
        await client.connect();

        //DATA FROM COLLECTION BOOKAPI  
        const colli = client.db(dbName).collection("Projects");
        const query = { category: "otherProjects"}
        const project = await colli.find(query).toArray();



        //GETTIN JSON FILE BACK
        if(project){
            //GETTIN JSON FILE BACK
            res.status(200).send(project);
            return
        }else{
            res.status(500).send("Project with category 'otherProject' is not found ");
        }

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