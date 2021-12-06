const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');

const productRoutes = require('./routes/productRoutes');

env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.h7nqs.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    ).then(()=>{
        console.log("connected successfully");
});

app.use(express.json());
app.use('/api', productRoutes);

var server = app.listen(process.env.PORT, ()=> {
    console.log(`successfully running on serevr ${process.env.PORT}`);
  });
module.exports = server;

// exports.server = app.listen(process.env.PORT, ()=> {
//   console.log(`successfully running on serevr ${process.env.PORT}`);
// });