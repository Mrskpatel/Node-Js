import React, {  useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Todo.css'

export default function Todo() {

  const [admin,setAdmin]=useState([]);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phoneno,setPhoneno]=useState('');

  const navigate=useNavigate();
  

  const handlesubmit=async(e)=>{
    e.preventDefault();

    await axios.post('http://localhost:2025/admin/insertadmin',{name,email,password,phoneno})
    .then((res)=>{
       console.log(res)
       setAdmin([...admin,res.data])

       setName('');
       setEmail('');
       setPassword('');
       setPhoneno('');
       navigate('/viewadmin');
    
      
    })
    .catch((err)=>{
      console.log(err);
    })

    
  }

  return (

    <div className="todo-container">
      <h2>Add Admin</h2>

      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Enter your phone number"
          value={phoneno}
          onChange={(e) => setPhoneno(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>

  )
}
