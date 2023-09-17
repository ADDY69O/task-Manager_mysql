
const mysql = require('mysql2');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const express = require('express');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'user'
})

const createAccount =(req,res)=>{

    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(401).json({message:"Please fill all the fields"});
    }
    
    db.query('SELECT email FROM userdata WHERE email = ?',[email],(error,results)=>{
        if(error){
            return res.status(401).json({message:"error while fetching",error})
        }
        
        if(results.length>0){
            return res.status(401).json({message:"user already present"})
        } else {
            // User doesn't exist, proceed with registration
           const hashpassword = bcrypt.hashSync(password,10)
            db.query('INSERT INTO userdata SET ?', { name: name, email: email, password: hashpassword }, (error, results) => {
                if (error) {
                    return res.status(401).json({ message: "error while registering" })
                }
                return res.status(200).json({ message: "user registered successfully", results });
            });
        }
    });

}


const login = (req,res)=>{
    try {
       

    const{email,password}=req.body;

    

    if( !email || !password){
        return res.status(401).json({message:"Please fill all the fields"});
    }


    db.query("select * from userdata where email=?",[email],function(err,result){
        if(err){
            return res.status(401).json({message:"usern not found",err});
        }
        else{
            const passw=result[0].password;
            const id=result[0].id;

           if(result.length>0 && bcrypt.compareSync(password,passw)){
          
            const token = jwt.sign({id},"secret",{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60)})
           
           return res.status(200).json({message:"login successfully",token});
           }
           else{
            console.log(bcrypt.compareSync(password,result[0].password));
            return res.status(401).json({message:"invalid credentials"});
           }
        }
    })
 
} catch (error) {
        return res.status(401).json({message:"Internal server error",error})
}

}
//ROUTER 3 GET LOGIN USER details using :POST "auth/getuser".. Login required
const getUser = (req,res)=>{
    try {
        
    const id = req.user.id;

    db.query('select name,email from userdata where id=?',[id],(err,result)=>{
        if(err){
            return res.status(401).json({message:"internal server error",err})
        }

        return res.status(200).json({message:"fetched user", user:result[0]})
    })




    } catch (error) {
        return res.status(401).json({message:"internal server error",error})
    }

}



module.exports={createAccount,login,getUser};