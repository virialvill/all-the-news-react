import styled from "styled-components";

export const NavLink = styled.a`
  text-decoration: none;
  display: inline-block;
  color: white;
  text-transform: capitalize;
  font-weight: 700;
  padding: 0.5rem 1.5rem;
  &.active {
    box-shadow: inset 0 0 0 2px white;
    border-radius: 6px;
  }
  &:not(.active):hover {
    box-shadow: inset 0 0 0 2px white;
    border-radius: 6px;
    background-color: #00aeef;
  }
`;
