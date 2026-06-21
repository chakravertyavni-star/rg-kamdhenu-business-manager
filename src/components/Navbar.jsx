import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="navbar-left">

        <img
          src="/logo.png"
          alt="RG Kamdhenu"
          className="navbar-logo"
        />
 

      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/revenue">Revenue</Link>

        <Link to="/expenses">Expenses</Link>

         <Link to="/reports">
            Reports
        </Link>

        <Link to="/analytics">Analytics</Link>

        <Link to="/exports">Exports</Link>

      </div>

    </nav>
  );
}