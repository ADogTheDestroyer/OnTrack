import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
/*  console.log(`Username: ${username}`);
    console.log(`Password: ${password}`); */

    // validate form values and submit them to the server
    try {
        const response = await axios.post('http://localhost:8080/users/checkuser', {
          username: username,
          password: password
        });
        const validUser = response.data;

        console.log(username + ', ' + password + ', ' + validUser);

        if(validUser === true) {
          document.location.href = '/home';
        } else {
          setUsername('');
          setPassword('');
          document.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
  };
  

  return (
    <div>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <br />
        <div className="buttonContainer">
          <button className="button" type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
