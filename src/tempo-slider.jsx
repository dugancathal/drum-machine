import React from 'react';

const TempoSlider = ({tempo, onTempoChange}) => {
  return (
    <div>
      <input type="range" name="tempo" value={tempo} min="40" max="160" onChange={onTempoChange}/>
      <span>{tempo} BPM</span>
    </div>
  )
};

export default TempoSlider;