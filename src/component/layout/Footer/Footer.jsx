import React from 'react';
import playstore from '../../../images/playstore.png';
import appstore from '../../../images/Appstore.png';
import './footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="PlayStore" />
        <img src={appstore} alt="AppStore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights {new Date().getFullYear()} &copy; Hesbon Osoro</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://github.com/hesbon-osoro">Github</a>
        <a href="https://linkedin.com/in/hesbon-osoro">LinkedIn</a>
        <a href="https://www.youtube.com/channel/UCgHKQfyNh8thOZtS4kfQG-A">
          Youtube
        </a>
        <a href="https://twitter.com/wazimu_hb">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
