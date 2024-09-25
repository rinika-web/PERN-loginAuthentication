import React from 'react';

const Slider = ({ speed, setSpeed }) => {
  const handleChange = (e) => {
    const newSpeed = parseFloat(e.target.value); // Parse the new speed value from the slider input
    setSpeed(newSpeed); // Update the speed state with the new value
  };

  

  const sliderStyles = {
    width: '100%',  
    marginTop: '7px',
  };

  const labelStyles = {
    fontWeight: 'bold',  
    color: 'black',
    fontSize: '25px', 
  };

  return (
    <div className="slider-container">
      <label htmlFor="speed-slider" style={labelStyles}>Speed: {speed}x</label>
      <input
        type="range"
        id="speed-slider"
        min="0.5"
        max="5"
        step="0.1"
        value={speed}
        onChange={handleChange}
        style={sliderStyles}  
      />
    </div>
  );
};

export default Slider;
