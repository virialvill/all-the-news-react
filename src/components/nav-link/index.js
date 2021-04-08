import React from "react";

import { NavLink } from "./styles";

const NavItem = (props) => {
  const sendSection = (section) => {
    props.setSection(section);
  };

  return (
    <li>
      <NavLink
        className={props.navItem === props.section ? "active" : ""}
        href={`#${props.navItem}`}
        onClick={() => sendSection(props.navItem)}
      >
        {props.navItem}
      </NavLink>
    </li>
  );
};
export default NavItem;
