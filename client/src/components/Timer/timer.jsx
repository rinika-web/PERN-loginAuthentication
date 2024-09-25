import React, { useEffect, useRef } from 'react';
import './timer.css';

const Timer = ({ speed }) => {
  const dateRef = useRef(new Date()); // reference to current date
  const intervalRef = useRef(null);  // referance to current interval

  useEffect(() => {

    dateRef.current = new Date(dateRef.current.getTime() - 120000); // to set the initial time 120 sec before the current time

    // to display the current time

    const displayTime = () => {
      const hr = document.getElementById('hour');
      const min = document.getElementById('min');
      const sec = document.getElementById('sec');

// to get current time components

      const hh = dateRef.current.getHours();
      const mm = dateRef.current.getMinutes();
      const ss = dateRef.current.getSeconds();

// for clock hand rotation

      const hRotation = 30 * hh + mm / 2;
      const mRotation = 6 * mm;
      const sRotation = 6 * ss;

      hr.style.transform = `rotate(${hRotation}deg)`;
      min.style.transform = `rotate(${mRotation}deg)`;
      sec.style.transform = `rotate(${sRotation}deg)`;
    };
// update the rotate time every sec and get the rotation anti-clockwise
    const updateClock = () => {
      dateRef.current = new Date(dateRef.current.getTime() - 1000);
      displayTime();
    };

    displayTime();  // for show time immediately

    if (intervalRef.current) {
      clearInterval(intervalRef.current);  //clear the existing interval
    }

    intervalRef.current = setInterval(updateClock, 1000 / speed);

    return () => clearInterval(intervalRef.current); 
  }, [speed]);

  return (
    <div className="container">
      <div className="clock">
        <div style={{ '--clr': '#f0233e', '--h': '70px' }} id="hour" className="hand"><i></i></div>
        <div style={{ '--clr': '#00a6ff', '--h': '81px' }} id="min" className="hand"><i></i></div>
        <div style={{ '--clr': '#f6ef93', '--h': '93px' }} id="sec" className="hand"><i></i></div>
        <span style={{ '--i': 1, '--clr': 'rgb(123, 245, 123)' }}><b>1</b></span>
        <span style={{ '--i': 2, '--clr': 'rgb(169, 65, 169)' }}><b>2</b></span>
        <span style={{ '--i': 3, '--clr': 'rgb(28, 163, 167)' }}><b>3</b></span>
        <span style={{ '--i': 4, '--clr': 'rgb(123, 245, 123)' }}><b>4</b></span>
        <span style={{ '--i': 5, '--clr': 'rgb(169, 65, 169)' }}><b>5</b></span>
        <span style={{ '--i': 6, '--clr': 'rgb(28, 163, 167)' }}><b>6</b></span>
        <span style={{ '--i': 7, '--clr': 'rgb(123, 245, 123)' }}><b>7</b></span>
        <span style={{ '--i': 8, '--clr': 'rgb(169, 65, 169)' }}><b>8</b></span>
        <span style={{ '--i': 9, '--clr': 'rgb(28, 163, 167)' }}><b>9</b></span>
        <span style={{ '--i': 10, '--clr': 'rgb(123, 245, 123)' }}><b>10</b></span>
        <span style={{ '--i': 11, '--clr': 'rgb(169, 65, 169)' }}><b>11</b></span>
        <span style={{ '--i': 12, '--clr': 'rgb(28, 163, 167)' }}><b>12</b></span>
      </div>
    </div>
  );
};

export default Timer;
