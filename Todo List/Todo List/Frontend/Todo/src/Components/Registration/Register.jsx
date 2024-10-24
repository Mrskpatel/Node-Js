import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [register, setRegister] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const navigator = useNavigate();

  const handleregister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await axios.post("http://localhost:2025/admin/registration", { username, email, password })
      .then((res) => {
        console.log(res);
        setRegister([...register, res.data]);

        setUsername('');
        setEmail('');
        setPassword('');

        setSuccessMessage("Registration successful!");
        setErrorMessage('');

        setTimeout(() => {
          navigator("/login"); 
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Registration failed. Please try again.");
        setSuccessMessage('');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create an Account</h2>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form onSubmit={handleregister}>
          <div className="input-group">
            <input
              type="text"
              id="username"
              placeholder="Enter your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Submit'}
          </button>

          <p>Already have an account? <a href="/login">Go to Login</a></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
