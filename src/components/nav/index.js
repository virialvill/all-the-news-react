import React from "react";
import NavItem from "../nav-link";

import { Wrapper, NavList, NavLogo } from "./styles";

const Nav = ({ navItems, setSection, section }) => {
  return (
    <Wrapper>
      <NavList>
        <NavLogo>
          <a href="#top">
            <img src="img/logo.svg" alt="logo" />
          </a>
        </NavLogo>
        {navItems.map((navItem) => (
          <NavItem
            key={navItem}
            navItem={navItem}
            setSection={setSection}
            section={section}
          />
        ))}
      </NavList>
    </Wrapper>
  );
};

export default Nav;
