            import React,{useContext,useEffect,useRef} from 'react'
            import { useNavigate } from 'react-router-dom';

            import  { useState } from 'react';
            import Button from 'react-bootstrap/Button';
            import Modal from 'react-bootstrap/Modal';
            import NoteContext from '../context/notes/NoteContext'
import AddNotes from './AddNotes';
            import NoteItem from './NoteItem';
          
            const Notes = (props) => {
              const navigate = useNavigate();
              const {showAlert}=props;
                const context = useContext(NoteContext);
            const{notes,getNote,editNote}=context;
       
            const [note, setnote] = useState({id:"",title:"",description:"",tag:""})
            
            const refClose=useRef(null)


            const handleOnclick=(e)=>{
              // e.preventDefault();
                console.log(note);
                editNote(note.id,note.title,note.description,note.tag)
                refClose.current.click();
                showAlert("Note Edited Successfully","success")
              
            }


            const onChange=(e)=>{
              
              setnote({...note,[e.target.name]:e.target.value})
            }
 

            useEffect(() => {
             if(localStorage.getItem('token')){
                getNote();
             }
             else{
              navigate("/login")
             }
                // eslint-disable-next-line
            }, [])


            //modal functions
            const [show, setShow] = useState(false);

            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);
          
            //use ref
            const ref=useRef(null)

            //update note 
            const updateNote=async(currentNote)=>{
              
              await  setnote({id:currentNote.note_id,title:currentNote.note_title,description:currentNote.note_description,tag:currentNote.note_tag})
              ref.current.click();
            }
            
            
            return (
                <div>
   <AddNotes showAlert={props.showAlert}/>

{/* 
   //modalll */}
   <Button variant="primary" className='d-none' ref={ref} onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>

        {/* Input form to get the title description and the tag */}
        <form>
<div className="form-group">
  <label htmlFor="title">Title</label>
  <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter title" value={note.title} onChange={onChange}/>

</div>
<div className="form-group">
  <label htmlFor="description">Description</label>
  <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} />
</div>
<div className="form-group">
  <label htmlFor="tag">TAG</label>
  <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
</div>

</form>
        <Modal.Footer>
          <Button className='bg-gray-600' variant="secondary" ref={refClose} onClick={handleClose}>
            Close
          </Button>
          <Button className='bg-blue-900' disabled={note.title.length<5  || note.description.length<6} variant="primary" onClick={handleOnclick} onDoubleClick={handleClose} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      {/* here showing the note using the map function */}
            <div className="container my-4">
            <h1 className='text-4xl'>Your Notes</h1>
                <div className="p-4 grid grid-cols-2 gap-2 ">
                  
                { notes.map((note)=>{
                return <NoteItem key={note.note_id} showAlert={showAlert} note={note} updateNote={updateNote}/>;
                })}
                </div>
            </div>


                </div>
            )
            }

            export default Notes