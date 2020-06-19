import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth.js'

const Login = (props) => {
  const [ login, setLogin ] = useState({
    username: "",
    password: ""
  })
  const onChange = event=>{
    event.preventDefault()
    setLogin({...login,
    [event.target.name]:event.target.value
    })
  }
  const onSubmit = event=>{
    event.preventDefault()
    console.log(login);
    
    axiosWithAuth()
      .post('login', login)
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', response.data.payload)
        console.log(response.data.payload);
        console.log(localStorage.getItem('token'));
        props.history.push('/BubblePage')
      })
      .catch((error) => console.log(`Login error: ${error.response}`))
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
      <form onChange={onChange} onSubmit={onSubmit}>

      <h1>Welcome to the Bubble App!</h1>
      <p>LOG IN PLEASE</p>
      <br/>
      <br/>
      <label>Username:</label>  
      <input type='text' value={login.username} name='username'/>
      <label>Password:</label>  
      <input type='password' value={login.password} name='password'/>
      <br/>
      <input type='submit' value='Log In'/>
      </form>
  );
};

export default Login;
