import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './assets/dashboard.css';

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="container1 justify-content-between">
        {/* Only show the menu icon on mobile devices */}
        <div className="menu-icon mobile" onClick={toggleMenu}>
          <div className={`bar ${menuActive ? 'active' : ''}`} />
          <div className={`bar ${menuActive ? 'active' : ''}`} />
          <div className={`bar ${menuActive ? 'active' : ''}`} />
        </div>
        {/* Always show navigation links */}
        <div className={`nav-elements ${menuActive ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={toggleMenu}>
                Top Tracks
              </NavLink>
            </li>
            <li>
              <NavLink to="/artists" onClick={toggleMenu}>
                Top Artists
              </NavLink>
            </li>
            <li>
              <NavLink to="/RecentlyPlayed" onClick={toggleMenu}>
                Recently Played
              </NavLink>
            </li>
            <li>
              <NavLink to="/Recommendations" onClick={toggleMenu}>
                Get Recommendations
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
