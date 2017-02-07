import React from "react";
import {stepStyle} from "./style";
import {TICKS} from "./store";

const Stepper = ({currentStep}) => {
  const defaultStyle = Object.assign({}, stepStyle, {backgroundColor: 'transparent'});
  const currentStepStyle = Object.assign({}, stepStyle, {backgroundColor: 'deeppink'});
  return (
    <div>
      {new Array(TICKS).fill(0).map((_, i) => {
        return <div style={i == currentStep ? currentStepStyle : defaultStyle} key={i}></div>;
      })}
    </div>
  )
};

export default Stepper;