import React from "react";

const NavItem = (props) => {
    const sendSection = (section) =>{
        props.setSection(section);
    };

  return (
    <li>
      <a href={`#${props.navItem}`} onClick={() => sendSection(props.navItem)}>
        {props.navItem}
      </a>
    </li>
  );
};
export default NavItem;
