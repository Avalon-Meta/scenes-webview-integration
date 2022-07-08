import React, { useState } from "react";
import queryString from "query-string";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const parsed = queryString.parse(window.location.search);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { client_id, redirect_uri, response_type } = parsed;
    console.log(client_id, redirect_uri, response_type);
    const res = await axios.post(
      `https://custom-sso.herokuapp.com/auth/login/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`,
      {
        email,
        password,
      }
    );
    console.log(res.data);
    window.location.assign(res.data.url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email"> Email </label>
        <input
          type={"email"}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password"> Password </label>
        <input
          type={"password"}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;
