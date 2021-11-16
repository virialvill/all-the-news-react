import React from "react";
import { Wrapper, Entry, StoryImg, StoryTitle, StoryPara } from "./styles";

const Story = ({ story: { short_url, multimedia, title, abstract } }) => {
  return (
    <Wrapper href={short_url}>
      <Entry>
        <StoryImg
          src={multimedia ? multimedia[0].url : "/img/no-image.png"}
          alt="images"
        />
        <div>
          <StoryTitle>{title}</StoryTitle>

          <StoryPara>{abstract}</StoryPara>
        </div>
      </Entry>
    </Wrapper>
  );
};

export default Story;
