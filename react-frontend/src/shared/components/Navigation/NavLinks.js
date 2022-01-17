import React, { useContext } from "react";
// special link which can color the link suitably
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";
const NavLinks = (props) => {
  // useContext allows us to tap into a context to listen to it
  // whenever the context listening to changes the component is rerendered
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {/* all willn't be rendered all time in our final application */}
      <li>
        {/* exact provided to NavLink to apply Navlink coloring only when path is exactly '/' */}
        {/* NavLink used over Link when we have to style the currently active link using activeStyle*/}
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
