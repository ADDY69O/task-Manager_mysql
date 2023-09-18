import './App.css';
import { Routes, Route } from "react-router-dom";
import Naavbar from './components/Naavbar';
import Home from './components/Home';
import About from './components/About'
import {BrowserRouter} from 'react-router-dom'
import NoteState from './context/notes/NoteState';
import Aleart from './components/Aleart';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {useState} from 'react'
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    < >
<BrowserRouter>   
    <Naavbar/>
    <Aleart alert={alert}/>
    <NoteState>
      
    <div className="container my-3">
  <Routes>
      <Route exact path="/" element={<Home  showAlert={showAlert}/>}/>
        <Route exact path="/about" element={<About showAlert={showAlert}/>} />
        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
      
    </Routes>
    </div>
    </NoteState>
    </BrowserRouter>

  </>
  );
}

export default App;
 