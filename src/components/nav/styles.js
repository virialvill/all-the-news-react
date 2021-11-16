import styled from "styled-components";

export const NavPrincipal = styled.nav`
    nav {
  background: #B38993;
  width: 100%;
  transition: all 0.5s;
  position: sticky;
  top: 0;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

nav a {
  text-decoration: none;
  display: inline-block;
  color: white;
  text-transform: capitalize;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
}

nav a:not(.active):hover {
  box-shadow: inset 0 0 0 2px white;
  border-radius: 6px;
  background-color: #BFBFBF;
}

img {
  width: 100%;
}

`;