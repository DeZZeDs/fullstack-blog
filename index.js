require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose
    .connect(`${process.env.MONGOLINK}`)
    .then((res) => { console.log('db is ok');})
    .catch((err) => {console.log('err')})

const app = express();
const PORT = parseInt(process.env.PORT) || 4445;

app.use(express.json());
app.use(cors());
//routing
const routes = require('./routes/index.js');
app.use('/api', routes);

//upload files
app.use('/uploads', express.static('uploads'));

app.listen(PORT, (error) => {
    if(error) { console.log(error);}
    console.log('server started on port: ', PORT)
});

