
import React from "react";
import Story from "./story";

const Stories = (props) => {
  return (
    <div className="site-wrap">
      <h2 className="section-head">{props.section}</h2>
      {props.stories.map((story, index) => (
        <Story key={index} story={story} />
      ))}
    </div>
  );
};

export default Stories;
