const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');
const os = require('os');



//init app
const PORT = process.env.PORT || 5000;
const app = express();

// connect to redis
const REDIS_PORT = 6379
const REDIS_HOST = 'redis'
const redis_client = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redis_client.on('error', (err) => console.log('Redis Client Error', err));
redis_client.on('connect', () => console.log('Connected to redis...'));
redis_client.connect();

// connect to mongo DB
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
    .connect(URI)
    .then(() => console.log("connected to db..."))
    .catch((err) => console.log("Faild to connect db : ", err));

// Postgres-db connect
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 5432;
// const DB_HOST = 'postgres';

// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
//     connectionString: URI,
// });
//   client.connect()
//         .then(() => console.log("connected to postgres db..."))
//         .catch((err) => console.log("Faild to connect postgres db : ", err));

// My Application
app.get('/', (req, res) => { 
    redis_client.set('products', 'Products.......');
    console.log(`${os.hostname}`);   //test loadbalancer
    res.send('<h1>Hello From Abdelhady node app</h1>');
});

app.get('/data', async (req, res) => { 
    const products = await redis_client.get('products');
    res.send(`<h1>Hello From Abdelhady node app</h1> <h2>${products}</h2>`)
});

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));



