import React, { useState, useEffect } from 'react';

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = currentDate.getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Hello, Good Morning Admin 👋');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Hello, Good Afternoon Admin 👋');
      } else {
        setGreeting('Hello, Good Evening Admin 👋');
      }
    };

    const updateCurrentDate = () => {
      setCurrentDate(new Date());
    };

    const intervalId = setInterval(() => {
      updateGreeting();
      updateCurrentDate();
    }, 60000);

    updateGreeting();

    return () => clearInterval(intervalId);
  }, [currentDate]);

  const formattedDate = currentDate.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <p>{formattedDate}</p>
      <h1>{greeting}</h1>
    </div>
  );
};

export default Greeting;
