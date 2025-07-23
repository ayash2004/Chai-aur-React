import React,{useState, useContext} from "react";
import UserContext from "../context/UserContext";
function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const {setuser} = useContext(UserContext)
    const handleSubmit = (e) =>{
        e.preventDefault();
        setuser({username, password})
    }
    return (
        <div>
            <h2>Login</h2>
            <input type="text" 
            value={username} 
            onChange={ (e) => setUsername(e.target.value) } 
            placeholder="Username" />
            &nbsp;
            <input type="text" 
            value={password} 
            onChange={ (e) => setPassword(e.target.value)} 
            placeholder="Password"/>
            <br />
            <br />
            <input type="submit" value="Submit" onClick={handleSubmit} placeholder="Submit" />
        </div>
    )
}

export default Login