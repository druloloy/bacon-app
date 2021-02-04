const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT | 5000;
const ATLAS_URI = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json()); 

// connect to MongoDB database

mongoose.connect(ATLAS_URI, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(res=>{
        console.log('SuccessFully connected to database.')
    })
    .catch(e=>console.log(e));

// run express server
app.listen(PORT, ()=>{
        console.log('Listening on port: '+ PORT);
})


// mount routes
const bank_route = require("./routes/bank-routes");
const history_route = require("./routes/history-routes");

app.use('/bank',bank_route);
app.use('/history', history_route);