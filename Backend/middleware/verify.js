const jwt = require("jsonwebtoken");
const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'user'
})

const verify = (req,res,next)=>{
    try {
    //    console.log(req.headers.authorization);
    if(!req.headers.authorization){
        return res.status(401).send({message:"No autorization token"})
    }

    const token = req.headers.authorization.split(" ")[1];
   
    const decode = jwt.verify(token,"secret");
    
    let id = decode.id;
    db.query('select * from userdata where id = ?',[id],(err,result)=>{
        if(err){
            return res.status("sql fetching error");
        }
        else{
            req.user=result[0];
            next();
            }
    })
  
 
} catch (error) {
    console.log(req.user);
        return res.status(401).json({message:"internal server error",error})
}


}

module.exports=verify;