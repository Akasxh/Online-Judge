import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL} from "./Url.js"

export default function Register() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const Nav = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      axios.post(BACKEND_URL+"register", { mail, pass, name, handle })
        .then((res) => {
          if (res.data === "exists") {
            alert("User already exists");
          } else if (res.data === "success") {
            Nav("/");
          }
        });
    } catch (error) {
      console.log(error).msg("Error while registering");
    }
  }
  return (
    <div className="form-wrapper">
      <h2 style={{ padding: "1rem" }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          type="email"
          id="email"
          required
        />
        <label htmlFor="name">Full Name</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          required
        />
        <label htmlFor="handle">Handle</label>
        <input
          type="name"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          id="handle"
          required
        />
        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          id="password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <button>
        <Link to="/"> Already have an account? Login here.</Link>
      </button>
    </div>
  );
}
