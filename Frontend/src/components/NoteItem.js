        import React,{useContext} from 'react'
        import NoteContext from '../context/notes/NoteContext'

        const NoteItem = ({note,updateNote,showAlert}) => {
            const context = useContext(NoteContext);
            const{deleteNote}=context;
            
            
            return (
            <div key={note.note_id} className='mx-3' >
            
            
                <div className="card my-2  mx-2" >

                <div className="d-flex align-items-center mx-2">
                <h1>
                    <div className="card-title text-2xl">{note.note_title}</div>
                    </h1>

                    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note.note_id); showAlert("Note Deleted Successfully","success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2 " onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <div className="card-text my-1 mx-2">{note.note_description}</div>
            </div>

            </div>
        )
        }

        export default NoteItem