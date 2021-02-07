import React, { useState, useEffect } from 'react'
import './reset.css';
import './main.css';
import BirthdayList from './BirthdayList';
import video from './sludge-sm.mp4';
import posterImg from './sludge-poster.jpg';

function App() {
  const [style, setStyle] = useState({});
  const [displayBirthdays, setDisplayBirthdays] = useState(true);

  const tiltCard = (e) => {
    const maxTilt = 7;
    const tiltY = -maxTilt + ((e.clientX - 0) * (maxTilt - -maxTilt)) / (window.innerWidth - 0)
    setStyle({ transform: `rotateY(${tiltY}deg)` })
  }

  useEffect(() => {
    window.addEventListener('mousemove', tiltCard)
    return () => {
      window.removeEventListener('mousemove', tiltCard)
    }
  }, []);

  return (
    <React.Fragment>
      <React.Fragment>
        <video muted autoPlay loop className={displayBirthdays ? 'video' : "video inactive"} poster={posterImg}>
          <source src={video} />
        </video>
      </React.Fragment>
      <section className='container'>
        <BirthdayList style={style} setDisplayBirthdays={setDisplayBirthdays} />
      </section >
    </React.Fragment>
  );
}

export default App;
