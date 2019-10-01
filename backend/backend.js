"use strict";
const dotenv = require('dotenv').config('./');
const Constants = require('./Constants.js')
const express = require('express')
const session = require('express-session')

const MongoClient = require('mongodb').MongoClient;

const app = express()
const port = 3001

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-8m6pw.mongodb.net/test?retryWrites=true&w=majority`;
app.use(session({secret:"3234e234r23rfw34t3tg"}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");// just to simplify development, would need to be changed for production
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//add post to cart
//show cart in browser
app.get('/cart', (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const visitorSessionId = req.sessionID;
    const collection = client.db("store").collection("carts");
    collection.findOne({sessionID:visitorSessionId})
      .then( (cart) => {
        res.status(200).send(cart)
      })
      .catch((error)=>{
        res.status(200).send(error)
        console.error(error)
      })
  });

 

})




app.listen(port, () => console.log(`app listening on port ${port}!`))
