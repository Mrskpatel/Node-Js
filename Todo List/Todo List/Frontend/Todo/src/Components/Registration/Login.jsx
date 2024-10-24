import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [login, setLogin] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successmsg, setSuccessmsg] = useState("");

  const navigator = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:2025/admin/loginadmin", { email, password })
      .then((res) => {
        console.log(res);
        setLogin([...login, res.data]);

        setSuccessmsg("Login Successfully...!!");
        setTimeout(() => {
          navigator("/insertadmin");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div style={{ marginTop: "150px", textAlign: "center" }}>
        {successmsg && <div className="success-message">{successmsg}</div>}
      </div>
      <div className="login-container">
        <div className="login-box">
          <h2>Log In</h2>

          <form onSubmit={handlelogin}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Enter your Email Address"
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

            <button type="submit" className="submit-btn">
              Log in
            </button>

            <div className="extra-links">
              <p>
                Don't have an account? <a href="/">Create Account</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
