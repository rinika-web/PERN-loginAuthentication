import React, { useEffect, useState } from 'react';
import './RandomQuotes.css';

const RandomQuotes = () => {
  const [quote, setQuote] = useState('');  // state for get the Quote
  const [visible, setVisible] = useState(false); // state for visibility 

  useEffect(() => {

    // function for fetch the quotetion fo another link

    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness',{
          headers: { 'X-Api-Key': 'zydmFYYgmPCTxbuYly1MBQ==3MU9iPHnMxd5LqG4' }
        });
        const data = await response.json();   // wait for convert fetch data into json 
        const quoteText = data[0].quote;      // extract the qoute text
        const firstLine = quoteText.split('\n')[0]; // get first line from the quote
       
       
        // set the condition for get the code within 20 words
       
        if (firstLine.split(' ').length <= 20) {
          setQuote(firstLine);
        } else {
          setQuote(''); 
        }
      } catch (error) {
        console.error('Error fetching the quote:', error);
        setQuote('An error occurred while fetching the quote.');  // handle error while fetching 
      }
    };
//function for show notification for 4sec
    const showNotification = async () => {
      await fetchQuote ();
      setVisible (true);
      setTimeout(()=>
      setVisible(false), 4000);
    };

    showNotification();

    const intervalId = setInterval(showNotification, 5000);  // then show new notifition in 5 sec

    return () => clearInterval(intervalId);  // Clear the interval when the component unmounts
  }, []);

  return (
    <div className={`random-quotes ${visible ? 'show' : ''}`}>
      <p>{quote || 'Hello!'}</p>
    </div>
  );
};

export default RandomQuotes;
