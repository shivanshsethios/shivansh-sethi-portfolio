import React from "react";
import "./WhatsAppButton.css"; // Import the styles

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919763000088"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp_float"
    >
      <i className="fa-brands fa-whatsapp whatsapp-icon"></i>
    </a>
  );
};

export default WhatsAppButton;