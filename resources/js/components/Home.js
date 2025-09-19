import React from "react";
import { useHistory } from "react-router-dom"; // v5 uses useHistory
import "../../sass/Home.scss";

function Home() {
  const history = useHistory();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Kuyalloyd Project 🚀</h1>
        <p>
          Manage your contacts, stay connected, and keep everything organized in
          one place. Simple. Fast. Modern.
        </p>
        <div className="hero-actions">
          <button onClick={() => history.push("/signup")}>Get Started</button>
          <button onClick={() => history.push("/contact")}>Contact Us</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>📇 Contact Manager</h3>
          <p>Add, edit, and delete contacts with a clean and modern UI.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure Login</h3>
          <p>Keep your data safe with secure authentication.</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Fast & Responsive</h3>
          <p>Works on any device with a modern responsive design.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
