import axios from 'axios'
import React,{useState} from 'react' 
import { useHistory } from "react-router-dom";

const Registration = props =>{

    const[email,setEmail] = useState('')
    const[name,setName] = useState('')
    const[password,setPassword] = useState('')
    let history = useHistory();



    const registerHandler = (e) =>{
        e.preventDefault()
        const data = {
            email,
            name,
            password
        }
        axios.post("http://localhost:8000/api/admin-register",data)
        .then(res =>{
            history.push("/admin-panel")
        })
        .catch(err =>{

        })
    }

    return(
        <div>
            <center>
      <form>
        <h2>Registration</h2>
        <label>Email</label>
        <input
         value={email}
         onChange={e => setEmail(e.target.value)}
        />
        <label>Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label>Password</label>
        <input
         value={password}
         onChange={e => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button
          
          type="submit"
          onClick={e => registerHandler(e)}
        >
          Submit
        </button>
      </form>
    </center>
        </div>
    )
}

export default Registration