import React from "react";
import NavItem from "./NavItem";

const Nav = (props) => {
    return (
        <nav>
          <ul>
            {props.navItems.map((navItem, index) => (
              <NavItem
                key={index}
                navItem={navItem}
                setSection={props.setSection}
          />
            ))}
          </ul>
        </nav>
      );
    };

export default Nav;
