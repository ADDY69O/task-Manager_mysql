const express = require('express');
const dotenv = require('dotenv');
const cors=require('cors');

dotenv.config({path:'./.env'});

const app = express();
app.use(express.json());
app.use(cors());

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