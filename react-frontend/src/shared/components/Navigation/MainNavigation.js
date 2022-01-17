import React, { useState } from "react";

import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import Backdrop from '../UIElements/Backdrop'
import "./MainNavigation.css";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // you needn't return anything compulsorily in a function in JS
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {/* react portal allow us to render react component in different position than it would be normally rendered */}
      {/* you can use jsx inside curly braces in this ternary expression */}
      {/* how is backdrop and sidedrawer rendered together -based on the css  */}
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )
      <MainHeader>
        {/* you have to pass event handler in the onClick field inside curly braces*/}
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
