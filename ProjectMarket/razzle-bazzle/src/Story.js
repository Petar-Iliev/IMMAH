import React from 'react';
import Carousel from 'react-elastic-carousel';
import Card from './Card';
import './static/css/story.css'

import empty_box from './static/pngs/cherry-list-is-empty-1.png'
import sending_email from './static/pngs/cherry-message-sent.png';
import robot_pic from './static/pngs/cherry-delete-confirmation-1.png';
import ill_man from './static/pngs/cherry-656.png'
import experiment from './static/pngs/experiment.png';
import robb from './static/pngs/robb.png';
import door from './static/pngs/door.png';
function Story(){
 return(
      <section className="intro-section">
          <div className="story-wrapper">
        <Carousel pagination={false} disableArrowsOnEnd={false}>
          <Card img={empty_box} text="Not what i expected."></Card>
          <Card img={sending_email} text="Contact them."></Card>
          <Card img={robot_pic} text="Responding . . . Copy - Paste."></Card>
          <Card img={ill_man} text="That's you."></Card>
          <Card img={experiment} text="You are just part of a social experiment."></Card>
          <Card img={robb} text="Guess whos money are in the bag ?"></Card>
          <Card img={door} text="So long !"></Card>
        </Carousel>
        </div>
</section>
 ) 
}

export default Story;