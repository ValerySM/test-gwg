import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import EWE from '../Universes/EWE/src/EWE';
import EcoGame from '../Universes/ECI/EcoGame';
import EatsApp from '../Universes/EWI/src/EatsApp';
import '../css/UniverseSwitcher.css';
import loadingImage from '../components/public/load_screen_univ.avif';
import './UniverseSwitcher.css';

const UniverseSwitcher = () => {
  const [currentUniverse, setCurrentUniverse] = useState('EWE');
  const [nextUniverse, setNextUniverse] = useState('');
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const universeOrder = ['EWE', 'ECI', 'EWI'];

  const getNextUniverse = (direction) => {
    const currentIndex = universeOrder.indexOf(currentUniverse);
    if (direction === 'next') {
      return universeOrder[(currentIndex + 1) % universeOrder.length];
    } else if (direction === 'prev') {
      return universeOrder[(currentIndex - 1 + universeOrder.length) % universeOrder.length];
    }
  };

  const changeUniverse = (direction) => {
    setIsLoading(true);
    const next = getNextUniverse(direction);
    setNextUniverse(next);
    setTimeout(() => {
      setCurrentUniverse(next);
      setIsLoading(false);
    }, 2000);
  };

  const renderUniverse = () => {
    switch (currentUniverse) {
      case 'EWE':
        return <EWE setIsTabOpen={setIsTabOpen} />;
      case 'ECI':
        return <EcoGame setIsTabOpen={setIsTabOpen} />;
      case 'EWI':
        return <EatsApp setIsTabOpen={setIsTabOpen} />;
      default:
        return <EWE setIsTabOpen={setIsTabOpen} />;
    }
  };

  return (
    <div className='container'>
      {!isTabOpen && !isLoading && (
        <div className='btn-container'>
          <button className='npBtn' onClick={() => changeUniverse('prev')}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className='npBtn' onClick={() => changeUniverse('next')}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
      <main>
        {isLoading ? (
          <div className="loading-screen">
            <img src={loadingImage} alt="Loading" />
            <p>Переход во вселенную {nextUniverse}...</p>
          </div>
        ) : (
          renderUniverse()
        )}
      </main>
    </div>
  );
};

export default UniverseSwitcher;