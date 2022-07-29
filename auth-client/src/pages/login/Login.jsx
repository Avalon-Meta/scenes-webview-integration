import React, { useState } from "react";
import queryString from "query-string";
import axios from "axios";
import { AUTH_SERVER } from "../../constants";
import styles from "./login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // parse query parameters from browser url
  const parsed = queryString.parse(window.location.search);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { client_id, redirect_uri, response_type } = parsed;

    try {
      const res = await axios.post(
        `${AUTH_SERVER}/auth/login?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`,
        {
          email,
          password,
        }
      );

      console.log(res.data);
      window.location.assign(res.data.url);
    } catch (e) {
      switch (e.response.status) {
        case 403:
          toast.error("Invalid credentials");
          break;
        default:
          toast.error("Unable to login. Try again later");
          break;
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: "center", marginTop: "1em" }}>Sign in to X</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.customLabel} htmlFor="email">
            Email
          </label>
          <input
            type={"email"}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.customLabel} htmlFor="password">
            Password
          </label>
          <input
            type={"password"}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="primary-button">Login</button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        theme="colored"
        className={styles.toast}
      />
    </div>
  );
};

export default Login;
