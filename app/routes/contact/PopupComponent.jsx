import React from 'react';
import { PopupWidget } from 'react-calendly';

const PopupComponent = () => {
  
  return (
    <div className="popup-widget">
      <PopupWidget
        url="https://calendly.com/your-calendly-url" 
        rootElement={document.getElementById('main-content')}
        text="Schedule Time with me"
        textColor="#ffffff"
        color="#319795"
      />
    </div>
  );
};

export default PopupComponent;
