import React, { useEffect, useState } from "react";
import "./nav.css";
import { NavLink } from "react-router-dom";
import { useRef } from "react";

function Nav({ setCategory, setQuery }) {
  const [dropdown, setDropdown] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [querystate, setQueryState] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (!querystate) setSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [querystate]);

  const handleCategory = (category) => {
    setCategory(category);
  };

  const handleSearch = () => {
    setQuery(querystate);
  };

  return (
    <div className="nav">
      <div className="logo">
        <div className="title">NEWS</div>
      </div>

      <div className="navmenu">
        <ul>
          <li>
            <NavLink
              to="/"
              onClick={() => {
                handleCategory("general");
                setQueryState("");
              }}
            >
              HOME
            </NavLink>
          </li>
          <li
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <span>CATEGORIES</span>
            {dropdown && (
              <ul className="dropdown">
                <li>
                  <NavLink
                    to="/business"
                    onClick={() => handleCategory("business")}
                  >
                    Business
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/entertainment"
                    onClick={() => handleCategory("entertainment")}
                  >
                    Entertainment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/health"
                    onClick={() => handleCategory("health")}
                  >
                    Health
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/science"
                    onClick={() => handleCategory("science")}
                  >
                    Science
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sports"
                    onClick={() => handleCategory("sports")}
                  >
                    Sports
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/technology"
                    onClick={() => handleCategory("technology")}
                  >
                    Technology
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      <div className="searchcontainer">
        <div
          className={`search-bar ${searchActive ? "active" : ""}`}
          ref={searchRef}
          onClick={() => setSearchActive(true)}
        >
          <div
            className={`searchinnercontainer ${querystate ? "qactive" : ""} `}
          >
            <input
              type="text"
              name="query"
              id="query"
              value={querystate}
              onChange={(e) => setQueryState(e.target.value)}
              placeholder="Search News"
            />
            <div className="icon">
              {querystate ? (
                <NavLink to={"/search-request"} onClick={handleSearch}>
                  <span className="arrow">
                    <i className="fa-solid fa-arrow-right fa-beat-fade"></i>
                  </span>
                </NavLink>
              ) : (
                <span className="magnifying">
                  <i className="fa-solid fa-magnifying-glass fa-fade"></i>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
