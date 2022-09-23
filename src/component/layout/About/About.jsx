import React from 'react';
import './about.css';
import { Button, Typography, Avatar } from '@material-ui/core';
import { YouTube, GitHub, LinkedIn, Twitter } from '@material-ui/icons';
const About = () => {
  const visitGithub = () => {
    window.location = 'https://github.com/hesbon-osoro';
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src="https://i.postimg.cc/tCm4kf1b/photo-2022-03-09-20-40-16-removebg-preview-modified.png"
              alt="Founder"
            />
            <Typography>Hesbon Osoro</Typography>
            <Button onClick={visitGithub}>Visit Github</Button>
            <span>
              This is a sample website built for the purpose of learning MERN
              stack
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/channel/UCgHKQfyNh8thOZtS4kfQG-A"
              target="_blank"
              rel="noreferrer noopener"
            >
              <YouTube className="youtubeSvgIcon" />
            </a>
            <a
              href="https://github.com/hesbon-osoro"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHub className="githubSvgIcon" />
            </a>
            <a
              href="https://www.linkedin.com/in/hesbon-osoro"
              target="_blank"
              rel="noreferrer noopener"
            >
              <LinkedIn className="linkedinSvgIcon" />
            </a>
            <a
              href="https://twitter.com/wazimu_hb"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Twitter className="twitterSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
