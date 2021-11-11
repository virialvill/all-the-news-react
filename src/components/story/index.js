
import React from "react";
import { Wrapper, Entry, StoryImg, StoryTitle, StoryPara } from "./styles";

const Story = (props) => {
  return (
    <Wrapper href={props.story.short_url}>
      <Entry>
        <StoryImg
          src={
            props.story.multimedia
              ? props.story.multimedia[0].url
              : "/img/no-image.png"
          }
          alt="images"
        />
        <div>
          <StoryTitle>{props.story.title}</StoryTitle>

          <StoryPara>{props.story.abstract}</StoryPara>
        </div>
      </Entry>
    </Wrapper>
  );
};

export default Story;
