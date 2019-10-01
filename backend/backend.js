"use strict";
const dotenv = require('dotenv').config('./');
const Constants = require('./Constants.js')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');



const MongoClient = require('mongodb').MongoClient;

const app = express()
const port = 3001

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-8m6pw.mongodb.net/test?retryWrites=true&w=majority`;
app.use(bodyParser.text({type: '*/*'}));
app.use(session(
  {secret:"3234e234r23rfw34t3tg", 
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }
}
)
)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://70.30.166.248:3000");// just to simplify development, would need to be changed for production
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
//add post to cart
//show cart in browser
app.get('/', (req, res)=>{
  req.session.save()
})
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
        res.status(400).send(error)
        console.error(error)
      })
      .finally(()=>{
        req.session.save()
        client.close()
      })
  });
})
app.get('/stock', (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
   
    const collection = client.db("stock").collection("items");
    collection.find().toArray()
      .then( (items) => {
        res.status(200).send(items)
      })
      .catch((error)=>{
        res.status(400).send(error)
        console.error(error)
      })
      .finally(()=>{
        req.session.save()
        client.close()
      })
  });
})
app.post('/addToCart', (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("store").collection("carts");
    let item = req.body
    if(item !== "" && item != null)
    {
      item = JSON.parse(item)
    }
    if(item.quantity == undefined || item.quantity === 0)
          {
            item.quantity = 1;
          }
          else
          {
            item.quantity++;
          }

    const visitorSessionId = req.sessionID;
    collection.findOne({sessionID:visitorSessionId})
      .then( (items) => {
        
        if(items == null)
        {
          //no cart yet
          let cart = [item]
          return collection.insertOne({sessionID: visitorSessionId, cart: cart})
        }
        else
        {
          let cart = items.cart;
          let indexOfitemInCart = cart.map(item => item.name).indexOf(item.name)
          if(indexOfitemInCart !== -1)
          {
            //item already present in cart, increase quantity
            cart[indexOfitemInCart].quantity++
            return collection.updateOne({sessionID: visitorSessionId},{$set:{cart: cart}})
          }
          else
          {
             //item not in cart
             cart.push(item)
             return collection.updateOne({sessionID: visitorSessionId}, {$set:{cart: cart}})
          }
        }
      })
      .then( (resp) =>{
        res.status(200).send(resp)
      } )
      .catch((error)=>{
        res.status(400).send(error)
        console.error(error)
      })
      .finally(()=>{
        req.session.save()
        client.close()
      })
  });
})




app.listen(port, () => console.log(`app listening on port ${port}!`))
