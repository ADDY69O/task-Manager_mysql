
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

const fetchNote =(req,res)=>{

const id = req.user.id;



db.query('select note_id,note_title,note_description,note_tag,id from notesdata where id = ?',[id],(err,result)=>{
    if(err){
        return res.status(401).json({message:"internal server error",err})
    }
    return res.status(200).json({message:"fetched notes",data:result})

})

}


const createNote = (req,res)=>{
    const {tag,description,title}=req.body;
    
    if(!tag || !description ||!title){
        return res.status(401).json({message:"insufficient credentials"});
    }

    try {
        
    db.query('insert into notesdata set ?',{note_title:title , note_description:description,note_tag:tag,id:req.user.id},(err,result)=>{
        if(err){
            return res.status(401).json({message:"internal server error",err})
        }
        // return res.status(200).json({message:"notes created successfully",data:result[0]})
        const insertedNoteId = result.insertId;
            db.query('SELECT * FROM notesdata WHERE note_id = ?', [insertedNoteId], (err, noteResult) => {
                if (err) {
                    return res.status(401).json({ message: "internal server error", err });
                }
                return res.status(200).json({ message: "note created successfully", data: noteResult[0] });
            });
    })


    } catch (error) {
        return res.status(401).json({message:"internal server error",err})
    }



}

const deleteNote = (req,res)=>{

    const {id} = req.params;

    try {
        //check the user contains the id for the note
        db.query('select id from notesdata where note_id =?',[id],(err,result)=>{
            if(err){
                return res.status(401).json({message:"internal server error",err});
            }
            
            else if(result.length>0  && result[0].id==req.user.id ){

                db.query('delete from notesdata where note_id=?',[id],(err,result)=>{
                    if(err){
                        return res.status(401).json({message:"internal server error",err})
                    }
                    return res.status(200).json({message:'note deleted'})
                })
            }
            else{
            
                return res.status(401).json({message:"unauthentiacated"});
            }
        })
        
    } catch (error) {
        return res.status(401).json({message:"internal server error"})
    }



}

const updateNote = (req,res)=>{
    try {
        const {tag,description,title}=req.body;
        const {id}=req.params;
        const note_id=id;
    
        if(!tag || !description ||!title||!note_id){
            return res.status(401).json({message:"insufficient credentials"});
        }
        const sql = 'UPDATE notesdata SET note_title=?, note_description=?, note_tag=? WHERE note_id=?';
        const values = [title, description, tag, note_id];
    
        
        //update the data in database with new values
        db.query(sql,values,(err,result)=>{
        
            if(err){
                return res.status(503).send("server is down");
            }
            // return res.status(200).json({message:"note updated successfully",data:result[0]});
            db.query('SELECT * FROM notesdata WHERE id = ?', [req.user.id], (err, noteResult) => {
                if (err) {
                    return res.status(401).json({ message: "internal server error", err });
                }
                return res.status(200).json({ message: "note updated successfully", data: noteResult});
            });
            
       
        })
    } catch (error) {
        return res.status(401).json({message:"internal server error"})
    }
}

module.exports={createNote,deleteNote,updateNote,fetchNote};