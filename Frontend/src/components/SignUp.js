import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const SignUp = (props) => {
    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const onChange=(e)=>{
      
        setcredentials({...credentials,[e.target.name]:e.target.value})
      }
    const handleOnclick=async(e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/auth/user/register",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})

        });
        console.log(response);
        const json =await response.json();
        console.log(json);
        if(json.success){

            localStorage.setItem('token',json.authToken);
            
           navigate("/");
           props.showAlert("Account Created Successfully","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }

    }
  
  return (
    <div>
            
    <form className='container' onSubmit={handleOnclick}>
<div className="form-group">

<div className="form-group">
  <label htmlFor="name">Name</label>
  <input type="text" value={credentials.name} onChange={onChange} className="form-control" id="name" name='name' />
</div>
  <label htmlFor="email">Email</label>
  <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange}  />
  <div id="emailHelp" className='form-text'>we'll never share your email with anyone</div>

</div>
<div className="form-group">
  <label htmlFor="password">password</label>
  <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name='password' minLength={5} />
</div>
<div className="form-group">
  <label htmlFor="cpassword">Confirm Password</label>
  <input type="password" value={credentials.cpassword} onChange={onChange} className="form-control" id="cpassword" name='cpassword' minLength={5}/>
</div>

<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75"  >Submit</button>


</form>

    </div>
  )
}

export default SignUp