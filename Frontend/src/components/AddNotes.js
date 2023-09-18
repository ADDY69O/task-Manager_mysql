import React,{useContext,useState} from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNotes = (props) => {
 
    const context = useContext(NoteContext);
    const{addNote}=context;

    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleOnclick=(e)=>{
      e.preventDefault();
      addNote(note.title,note.tag,note.description);
      setnote({title:"",description:"",tag:""})
      props.showAlert("Added successfully", "success")

    }
    const onChange=(e)=>{
      
      setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-6">
    <h1 className='text-4xl'>Add a Note</h1>
    
    <form>
<div className="form-group">
  <label htmlFor="title">Title</label>
  <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter title"  value={note.title} onChange={onChange}/>

</div>
<div className="form-group">
  <label htmlFor="description">Description</label>
  <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
</div>
<div className="form-group">
  <label htmlFor="tag">TAG</label>
  <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
</div>

<button disabled={note.title.length<5  || note.description.length<6} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75"  onClick={handleOnclick}>Submit</button>


</form>
</div>
  )
}

export default AddNotes