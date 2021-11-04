import React from "react";

// const Story = (props) => {
//   return (
//     <div className="entry">
//       <p>Story component</p>
//     </div>
//   );
// };

const Story = (props) => {
  return (
    <div className="entry">
      <img
        src={
          props.story.multimedia
            ? props.story.multimedia[1].url
            : "/img/no-image.png"
        }
        alt="images"
      />
      <div>
        <h3>
          <a href={props.story.short_url}>{props.story.title}</a>
        </h3>
        <p>{props.story.abstract}</p>
      </div>
    </div>
  );
};

export default Story;
