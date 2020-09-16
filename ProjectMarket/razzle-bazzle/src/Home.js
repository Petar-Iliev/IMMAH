import React from 'react';
import {Link} from 'react-router-dom';

import './Home.css';

import man from './static/pngs/cherry-56.png';




class Home extends React.Component {
  
  

  render() {
    return (
      <div className="home">
        <section className="intro-section">
          <div className="intro-wrapper">
            <div className="intro-info">
              <h1 className="intro-heading">
              IMPROVE THE CUSTOMER SERVICE
              </h1>
              <p className="intro-p">
              We are here to change the way you are treated by the customer service.
              "Client always right" is something we hear but can't be seen.
              If you don't exist they won't exist. They depend on you and in many cases you depend on them.
              </p>
              <div className="intro-links">
                <Link to="/story" className="intro-link">Learn more</Link>
                <Link to="/create/post" className="intro-link">POST</Link>
              </div>

            </div>
            <div className="intro-img">
              <img src={man} alt="man with a suit with his left hand behind his back and the right hand showing the text."/>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
