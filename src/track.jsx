import React from "react";
import {stepStyle} from "./style";

const Track = ({track, onStepClick}) => {
  const onStyle = Object.assign({}, stepStyle, {backgroundColor: 'blue'});
  const offStyle = stepStyle;
  return (
    <div>
      {track.steps.map((step, i) => {
        return <div style={step ? onStyle : offStyle} key={i} onClick={onStepClick(i)}></div>
      })}
    </div>
  )
};

export default Track;