import styled from "styled-components";

export const Head = styled.header`
  height: 320px;
  background: url(../img/elena-baidak.jpg) center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
  header {
    height: 120px;
  }
}

  h1{
  color: white;
  font-size: 7vw;
  font-weight: 400;
  text-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
}

`;

