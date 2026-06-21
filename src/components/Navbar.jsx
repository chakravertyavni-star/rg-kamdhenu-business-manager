import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
    useEffect(() => {
      setMenuOpen(false);
    }, [location]);
    
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

         <Link
          to="/dashboard"
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link>

        <Link
          to="/revenue"
          onClick={() => setMenuOpen(false)}
        >
          Revenue
        </Link>

        <Link
          to="/expenses"
          onClick={() => setMenuOpen(false)}
        >
          Expenses
        </Link>

        <Link
          to="/reports"
          onClick={() => setMenuOpen(false)}
        >
          Reports
        </Link>

        <Link
          to="/analytics"
          onClick={() => setMenuOpen(false)}
        >
          Analytics
        </Link>

        <Link
          to="/exports"
          onClick={() => setMenuOpen(false)}
        >
          Exports
        </Link>

      </div>

    </nav>
  );
}