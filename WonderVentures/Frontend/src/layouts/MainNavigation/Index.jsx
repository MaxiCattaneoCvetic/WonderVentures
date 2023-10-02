/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logoHeadBlanco.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import MainNavigationButtons from "../MainNavigationButtons/Index";
import MainNavigationUser from "../MainNavigationUser/Index";
import { token } from "../../features/user/Login/authSlice";

const MainNavigation = (props) => {
  const [click, setClick] = useState(false);
  const isAuth = useSelector(token);


  const handleClick = () => {
    //manejamos el estado del click, para cambiar la imagen
    setClick(!click);
  };

  function closeMobileMenu() {
    console.log("");
  }

  return (
    <>
      <header
        style={{ backgroundColor: props.bkColor, position: props.position }}
      >
        <nav className="navbar">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <img
                src={logo}
                alt="logo-WonderVentures"
                className="navbar-icon"
              />
            </Link>
            <div
              className="menu-icon"
              style={{ color: props.color }}
              onClick={handleClick}
            >
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                >
                  Home
                </NavLink>
              </li>
              {isAuth && (
                <>
                  <li className="nav-item">
                      <NavLink
                        to={"/wishlist"}
                        className={({ isActive }) =>
                          "nav-links" + (isActive ? " activated" : "")
                        }
                      >
                        Mis Favoritos
                      </NavLink> 
                  </li>
                  <li className="nav-item">
                      <NavLink
                        to={"/misReservas"}
                        className={({ isActive }) =>
                          "nav-links" + (isActive ? " activated" : "")
                        }
                      >
                        Mis Reservas
                      </NavLink> 
                  </li>
                </>
              )}
              {isAuth ? <MainNavigationUser /> : <MainNavigationButtons />}
            </ul>
        </nav>
      </header>
    </>
  );
};

export default MainNavigation;
