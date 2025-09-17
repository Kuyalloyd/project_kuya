import React, { useState } from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About.us";
import Contact from "./Contact.us";
import Login from "./Login";
import Signup from "./Signup";

function Router() {
  const [page, setPage] = useState("login"); // first page = login
  const [user, setUser] = useState(null);    // track if user is logged in

  return (
    <>
      {/* Show navbar only if logged in */}
      {user && <Navbar setPage={setPage} setUser={setUser} />}

      <div className="content">
        {page === "login" && <Login setPage={setPage} setUser={setUser} />}
        {page === "signup" && <Signup setPage={setPage} />}
        {page === "/Home" && user && <Home />}
        {page === "about" && user && <About />}
        {page === "contact" && user && <Contact />}
      </div>
    </>
  );
}

ReactDOM.render(<Router />, document.getElementById("app"));

export default Router;
