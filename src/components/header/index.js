import React from "react";

import { Wrapper, Headline } from "./styles";

const Header = ({ siteTitle }) => {
  return (
    <Wrapper>
      <Headline>{siteTitle}</Headline>
    </Wrapper>
  );
};

export default Header;
