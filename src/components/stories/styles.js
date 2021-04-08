import styled from "styled-components";

export const Wrapper = styled.div`
  width: 94vw;
  max-width: 960px;
  margin: 24px auto;
  background: white;
  padding: 1rem;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);

  display: grid;
  grid-template-columns: repeat(1fr 1fr);
  grid-template-rows: repeat(1fr 1fr);
  grid-gap: 1rem;
  grid-template-areas:
    "sectionhead sectionhead"
    "entry entry";
`;

export const PageHeader = styled.h2`
  font-family: Lobster;
  color: var(--blue);
  font-size: 2.5rem;
  text-transform: capitalize;
  padding-bottom: 0.25rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #007eb677;
  grid-area: sectionhead;
`;
