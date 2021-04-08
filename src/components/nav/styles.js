import styled from "styled-components";

export const Wrapper = styled.nav`
  background: #007eb6;
  width: 100%;
  transition: all 0.5s;
  padding: 6px 0;
  position: sticky;
  top: 0;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NavLogo = styled.li`
  overflow: hidden;
  img {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
