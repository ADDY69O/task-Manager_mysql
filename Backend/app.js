const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path:'../AUTHAPP/.env'});

const app = express();
app.use(express.json());


//db connection
require("./db/conn")


//routes
app.use("/auth/user",require('./routes/userRoutes'))
app.use("/auth/note",require('./routes/noteRoutes'))



app.get('/',(req,res)=>{
    res.send("<h1>Home Page</h1>")
})





app.listen(process.env.PORT,(req,res)=>{
    console.log(`app is listening on port ${process.env.PORT}`);
})