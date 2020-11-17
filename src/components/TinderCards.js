import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import axios from '../CustomAxios'; // import custom file
import './TinderCards.css';
import TinderCard from 'react-tinder-card';

const TinderCards = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/tinder/cards');
      setPeople(req.data)
    }

    fetchData();
    // axios.get("http://localhost:3001/tinder/card")
    //   .then(res => setPeople(res.data))
    //   .then(err => console.log(err));
  },[]);

  const swiped = (direction, nameToDelete) => {
    console.log('You swiped: ' + nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen')
  }

  return (
    <div className="tindercards">
      <div className="tindercards__cardContainer">
        {people.map(person => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              style={{ background: `url(${person.imageUrl})` }}
              className="card"
            >
              <h3> {person.name} </h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  )
}

export default TinderCards;
