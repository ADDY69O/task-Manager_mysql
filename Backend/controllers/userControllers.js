
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
    let success=false;
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(401).json({success, message:"Please fill all the fields"});
    }
    
    db.query('SELECT email FROM userdata WHERE email = ?',[email],(error,results)=>{
        if(error){
            return res.status(401).json({success, message:"error while fetching",error})
        }
        
        if(results.length>0){
            return res.status(401).json({success, message:"user already present"})
        } else {
            // User doesn't exist, proceed with registration
           const hashpassword = bcrypt.hashSync(password,10)
            db.query('INSERT INTO userdata SET ?', { name: name, email: email, password: hashpassword }, (error, results) => {
                if (error) {
                    return res.status(401).json({success, message: "error while registering" })
                }
                

                db.query('select name,email,id from userdata where email=?', [email], (error, result) => {
                    if (error) {
                        return res.status(401).json({ success,message: "error while registering" })
                    }
                    success=true;
                    const {id}= result[0].id;
                    
                    const authToken =jwt.sign({id},"secret",{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60)});
                    return res.status(200).json({success,authToken, message: "user registered successfully", result });
                });


            });
        }
    });

}


const login = (req,res)=>{
    try {
       let success=false;

    const{email,password}=req.body;

    

    if( !email || !password){
        return res.status(401).json({success,message:"Please fill all the fields"});
    }


    db.query("select * from userdata where email=?",[email],function(err,result){
        if(err){
            return res.status(401).json({success,message:"usern not found",err});
        }
        else{
            const passw=result[0].password;
            const id=result[0].id;

           if(result.length>0 && bcrypt.compareSync(password,passw)){
          
            const authToken = jwt.sign({id},"secret",{expiresIn:Math.floor(Date.now() / 1000) + (60 * 60)})
           success=true;
           return res.status(200).json({success,message:"login successfully",authToken});
           }
           else{
  
            return res.status(401).json({success,message:"invalid credentials"});
           }
        }
    })
 
} catch (error) {
        return res.status(401).json({success,message:"Internal server error",error})
}

}
//ROUTER 3 GET LOGIN USER details using :POST "auth/getuser".. Login required
const getUser = (req,res)=>{
    try {
        let success=false;
    const id = req.user.id;

    db.query('select name,email,password,id from userdata where id=?',[id],(err,result)=>{
        if(err){
            return res.status(401).json({success,message:"internal server error",err})
        }
        success=true;
        return res.status(200).json({success,message:"fetched user", user:result[0]})
    })




    } catch (error) {
        return res.status(401).json({success,message:"internal server error",error})
    }

}



module.exports={createAccount,login,getUser};