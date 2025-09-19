import React, { useState } from "react";
import "../../sass/Signup.scss";

function Signup({ setPage, setUser }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({}); 

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

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server returned non-JSON: ${text.substring(0, 100)}`);
      }

      if (!res.ok) {
        // ✅ show Laravel validation errors
        if (data.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.message || "Signup failed");
      }

      console.log("✅ User registered:", data);

      setStatus("✅ Account created! Redirecting...");
      setForm({ name: "", email: "", password: "" });
      setErrors({});

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
        {errors.name && <p className="error">{errors.name[0]}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email[0]}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error">{errors.password[0]}</p>}

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
