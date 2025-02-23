import React, { useState } from 'react';
import './App.css';


  const jokes = [
    "The only power that keeps us strong is the hope of correctness within ourself's the work you do today is the result of tomorrow ..... Sometimes sky(banu) going with the flow with the plan in studies is the best way to accomplish the best results. "
  ];

  const stories = [
    "Once upon a time, a small boy dreamed of flying. Everyone told him it was impossible. Years later, he became a pilot and proved them wrong!",
    "There is no one in this entire world who can stop you banu keep going until and unless you have reached your goal i as a well wisher and as a freind Pavan will always be for you always",
    "Every step you take, Banu, brings you closer to your dreams. Believe in yourself, stay focused, and never give up. You have the power to make anything happen. With hope, your __ :)!",
    "Banu, your hard work and perseverance inspire me every day. The world is waiting to see your success story. Keep shining, and remember, I'm always here for you. Your friend, __:).",
    "You are capable of achieving incredible things, Banu. Trust in your abilities, stay strong, and keep moving forward. I believe in you and your journey. Always, :)",
    "Your dreams are within reach, Banu. Keep your eyes on the prize, stay motivated, and remember that you are unstoppable. The best is yet to come. From :).",
    "With your dedication and passion, Banu, there is nothing you can't achieve. Keep pushing your limits, embrace challenges, and let your spirit soar. I'm always here for you, :).",
    "Banu, your hard work and perseverance inspire me every day. I'm here, giving my all, so we can build the future we've always dreamed of. Keep shining, and remember, I'm always here for you. Your friend, :).",
    "Banu, you mean the world to me. Your strength and resilience inspire me every day, and I am here to support you in every way I can. You have a special place in my heart, and I am committed to our journey together. Stay strong and keep believing in yourself, because amazing things are ahead for you. Your___ ,:) .",
    "Banu, your passion for learning is a gift, nurture it, and let it guide you to greatness, stay dedicated, stay inspired, and remember that I am always here for you, your ___, :)",
    "A young artist kept painting despite endless rejection. Today, their art is displayed in galleries worldwide!"
  ];
  const ChatbotPopup = () => {
    const showPopup = (message) => {
      alert(message);
    };
  
    return (
      <div className="container">
        <button className="joke-button" style={{ backgroundColor: "red", color: "white" }} onClick={() => showPopup(jokes[Math.floor(Math.random() * jokes.length)])}>
          hope
        </button>
        <button className="inspire-button" style={{ backgroundColor: "blue", color: "white" }} onClick={() => showPopup(stories[Math.floor(Math.random() * stories.length)])}>
          Inspire Me
        </button>
      </div>
    );
  };
  
  export default ChatbotPopup;
  