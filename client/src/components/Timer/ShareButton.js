import React from 'react';
import { Link } from 'react-router-dom';
import "./Share.css";

const ShareButton = ({ speed }) => {
  // handle the onclick event for share
  const handleClick = () => {

    // construct the url with locationpath and speed parameter

    const url = `${window.location.origin}${window.location.pathname}?speed=${speed}`;
   
   //copy the constracted url to the clipboard
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!'); // show alert after coping
    });
  };

  return (
    <div>
      <button onClick={handleClick} className="share-button">Share</button>
      <Link to="/login">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

export default ShareButton;
