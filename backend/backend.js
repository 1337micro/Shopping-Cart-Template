"use strict";
const Constants = require('./Constants.js')


const express = require('express')
const app = express()
const port = 3001
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");// just to simplify development, would need to be changed for production
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', (req, res) => {
  res.status(200).send("")  

})


app.listen(port, () => console.log(`app listening on port ${port}!`))
