const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const {Client} = require('pg');

//init app
const PORT= 4000;
const app= express();

//connect to redis
const REDIS_PORT ='6379';
const REDIS_HOST ='redis';
const redis_uri= `redis://${REDIS_HOST}:${REDIS_PORT}`;
const redisClient = redis.createClient({
    url: redis_uri
});
redisClient.on('error', (err)=>{console.log('failed with :',err)});
redisClient.on('connect', ()=>{console.log('connected to redis ....')});
redisClient.connect()

//connect db
const DB_USER ='root';
const DB_PASSWORD ='example';
const DB_PORT ='27017';
//const DB_HOST ='192.168.96.2'; in replace we will use name of service 'mongo'
const DB_HOST ='mongo';

const uri= `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
   .connect(uri)
   .then(()=> console.log('connect to db......'))
   .catch((err)=> console.log('failed to connect',err));


// connect db postgres
// const PG_USER ='root';
// const PG_PASSWORD ='example';
// const PG_PORT ='5432';
// const PG_HOST ='postgres';

// const uri_PG= `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}`;
// const client_PG = new Client({
//     connectionString:uri_PG
// })
// client_PG.connect()
//         .then(()=> console.log('connect to db postgres......'))
//         .catch((err)=> console.log('failed to connect to postgres',err));

mongoose
   .connect(uri)
   .then(()=> console.log('connect to db......'))
   .catch((err)=> console.log('failed to connect',err));

   
app.get('/',(req,res)=>{
    redisClient.set('product',"test products...");
    res.send('<h1>Hello World test wdww</h1>')
});

app.get('/data',async (req,res)=>{
    const products =await redisClient.get('product');
    res.send(`<h1>Hello World ${products}</h1>`)
});

app.listen(PORT, ()=>console.log(`app is up and running on port: ${PORT}`));