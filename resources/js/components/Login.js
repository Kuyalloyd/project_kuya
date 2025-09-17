import React, { useState } from "react";

function Login({ setPage, setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Simulate login
    if (form.email && form.password) {
      setUser({ email: form.email });  // mark user as logged in
      setPage("home");                  // redirect to home
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <button onClick={() => setPage("signup")}>Sign Up</button>
      </p>
    </div>
  );
}

export default Login;
