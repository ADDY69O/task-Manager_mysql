    import React from "react";
    import { useState } from "react";

    import NoteContext from "./NoteContext";

    const NoteState=(props)=>{
      const host="http://localhost:5000"

        const NoteIdetifier=
            [
        
        ]

        const [notes, setnotes] = useState(NoteIdetifier);
  //fetch all the notes
        const getNote =async()=>{

          const response=await fetch(`${host}/auth/note/fetch`,{
            method:'GET',
            headers:{

            "Content-Type":"application/json",
            "authorization":`Bearer ${localStorage.getItem('token')}`
            },


            })

            const json=await response.json();
            console.log(json);

            //setNotes
            // setnotes(json);
            await setnotes(json.data);

        }



        //add a Note

        const addNote =async(title,tag,description)=>{
        
                  // API fetch call

                  const response=await fetch(`${host}/auth/note/createNote`,{
                    method:'POST',
                    headers:{
          
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${localStorage.getItem('token')}`
                    },
                    body:JSON.stringify({title,description,tag})
          
          
                    })
          
                    const note=await response.json();
          
          
          // TODO: API CALL
                    console.log(note.data);

        
         await setnotes(notes.concat(note.data));

        }
        
        //delete a Note
        
        const deleteNote=async(id)=>{

            // API fetch call

            const response=await fetch(`${host}/auth/note/delete/${id}`,{
              method:'DELETE',
              headers:{
    
             
                "authorization":`Bearer ${localStorage.getItem('token')}`
              }
    
    
              })
    
              const json= await response.json();
    
              console.log(json);


          //TODO API CALL
          console.log(`deleting the note of that ${id}`);
          
          
          const newNotes=notes.filter((note)=>{return note.note_id!==id});
          console.log(newNotes);
         await setnotes(newNotes);
        }


        //Edit a Note
        const editNote=async(id,title,description,tag)=>{
            // API fetch call

            const response=await fetch(`${host}/auth/note/update/${id}`,{
            method:'PUT',
            headers:{

            "Content-Type":"application/json",
            "authorization":`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({title,description,tag})


            })

            const json= await response.json();
            console.log(json);

            let newNote= await JSON.parse(JSON.stringify(json.data));

          //logic to edit in client

          for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element.note_id === id){
                newNote[index].note_title=title;
                newNote[index].note_description=description;
                newNote[index].note_tag=tag;

                break;
            }
          

          }
          await setnotes(newNote);


        }


        return(
            <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
            </NoteContext.Provider>
        )

    }

    export default NoteState;