import React from "react";
import reactDom from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  // we can assign a JSX expression to a variable
  const content = (
    //   CSSTransition can be used as react component
    // last two props to remove the sidedrawer on exit of the animation or added on entering
    <CSSTransition in={props.show} timeout={200} mountOnEnter unmountOnExit  classNames="slide-in-left">
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );
  // component is part of component tree and content is loaded somewhere else
  return reactDom.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
