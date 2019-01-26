'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');
const { _Node, Queue } =require('./queue');
const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
let myCats = new Queue();

myCats.enqueue({
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
});

myCats.enqueue({
  imageURL:'https://images.pexels.com/photos/315582/pexels-photo-315582.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 
  imageDescription: 'stripes lounging on concrete.',
  name: 'Fluffy2',
  sex: 'Female',
  age: 2,
  breed: 'Bengaloid',
  story: 'livin on a prayer'
});
let myDogs = new Queue();

myDogs.enqueue({
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
});


app.get('/api/cats',(req, res, next)=>{
  //get a temp cat object  
  let nextCat = myCats.peek();
  res.json(nextCat);
});

app.get('/api/dogs',(req, res, next)=>{
  //get a temp dog object
  let nextDog = myDogs.peek();
  res.json(nextDog);
});


app.delete('/api/dogs', (req, res, next)=>{
  //remove the cat from the database, but
  //for now just remove the hard-coded-object
  // tempDog[0] = { imageURL:'', 
  //   imageDescription: 'No dog!',
  //   name: 'No dogs availible for adoption',
  //   sex: 'N/A',
  //   age: -1,
  //   breed: 'N/A',
  //   story: 'N/A'
  // };
  //tempDog.shift();
  let nextInLine = myDogs.dequeue();
  //if(nextInLine){
    res.status(201).json(nextInLine);
  //} 
  /*else {
    res.status(201).send("Empty Q");
  }*/
});

app.delete('/api/cats', (req, res, next)=>{
  //remove the cat from the database, but
  //for now just remove the hard-coded-object
  // tempCat[0] = { imageURL:'', 
  //   imageDescription: 'No cat!',
  //   name: 'No cats availible for adoption',
  //   sex: 'N/A',
  //   age: -1,
  //   breed: 'N/A',
  //   story: 'N/A'
  // };
  //tempCat.shift();//this will be dequeue later,

  myCats.dequeue();

  res.status(201).json(myCats.peek());// peek- at queue ->send that      
});
// action reducer = newState=client needs do some de-queue off local state.

app.use('*', (req,res,next)=>{
  //simple catch all route  
  res.status(404).send('Error 404: route not found!');  
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
