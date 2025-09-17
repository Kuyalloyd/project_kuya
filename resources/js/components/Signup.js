import React, { useState } from "react";
import "../../sass/Signup.scss";


function Signup({ setPage, setUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Signup failed");
      }

      const data = await res.json();
      console.log("✅ User registered:", data);

      setStatus("✅ Account created! Redirecting...");
      setForm({ name: "", email: "", password: "" });

      setTimeout(() => {
        setPage("login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setStatus("❌ " + err.message);
    }
  };

  return (
    <div className="auth-card">
      <h2>Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupUser();
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p className="status">{status}</p>
      <p>
        Already have an account?{" "}
        <span className="link" onClick={() => setPage("login")}>
          Log In
        </span>
      </p>
    </div>
  );
}

export default Signup;
