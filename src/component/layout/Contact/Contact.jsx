import React from 'react';
import './contact.css';
import { Button } from '@material-ui/core';

const Contact = () => {
  return (
    <div className="contactContainer">
      <a href="mailto:hesbonosoro1@gmail.com" className="mailBtn">
        <Button> Contact: hesbonosoro1@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
