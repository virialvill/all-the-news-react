import styled from "styled-components";

export const Wrapper = styled.a`
  text-decoration: none;
  border-bottom: 1px dotted #00000033;
`;

export const Entry = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1rem;
  margin-bottom: 1rem;
  grid-area: "entry";
`;

export const StoryTitle = styled.h3`
  color: #007eb6;
  text-decoration: none;
`;

export const StoryImg = styled.img`
  width: 100%;
`;

export const StoryPara = styled.p`
  margin-top: 0;
  color: #111;
`;
