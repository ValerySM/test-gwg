import React, { useState, useEffect } from 'react';
import Score from './comp/Score';
import './css/EWE.css'
import FarmButton from './comp/FarmButton';

function Ewe() {
  const [tokens, setTokens] = useState(0);
  const [farmedTokens, setFarmedTokens] = useState(0);
  const [isFarming, setIsFarming] = useState(false);

  useEffect(() => {
    let farmingInterval;
    if (isFarming) {
      let farmed = 0; 
      const maxTokens = 32;
      const duration = 3 * 60 * 60 * 1000;
      const interval = duration / (maxTokens * 1000); 

      farmingInterval = setInterval(() => {
        farmed += 0.001;
        setFarmedTokens(Number(farmed.toFixed(3)));

        if (farmed >= maxTokens) {
          clearInterval(farmingInterval);
          setIsFarming(false);
        }
      }, interval);
    }

    return () => clearInterval(farmingInterval);
  }, [isFarming]);

  const handleButtonClick = () => {
    if (isFarming) {
      collectTokens();
    } else {
      startFarming();
    }
  };

  const startFarming = () => {
    if (!isFarming) {
      setIsFarming(true);
      setFarmedTokens(0); 
    }
  };

  const collectTokens = () => {
    if (farmedTokens >= 32) { 
      setTokens(prevTokens => Number((prevTokens + farmedTokens).toFixed(3)));
      setFarmedTokens(0);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <Score tokens={tokens} />
      </header>
      <div className="content">
        <FarmButton
          isFarming={isFarming}
          farmedTokens={farmedTokens}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}

export default Ewe;
