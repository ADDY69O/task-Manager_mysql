
const mysql = require('mysql2');


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'user'
})

//conection with mysql
db.connect((err)=>{
    if(err){
        console.log(err);
    }else{

    console.log("Mysql connected");
    }

})

