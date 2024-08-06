import React, { useState, useEffect } from 'react';
import '../css/app.css'; 
import UniverseSwitcher from './components/UniverseSwitcher';
import EatsApp from './Universes/EWI/EatsApp';
import EWE from './Universes/EWE/EWE';
import EcoGame from './Universes/ECI/EcoGame';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentUniverse, setCurrentUniverse] = useState('EatsApp');

  useEffect(() => {
    const loadContent = async () => {
      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

      console.log('Start loading...'); // Отладочное сообщение
      await wait(4000); // Задержка на 4 секунды
      console.log('Loading complete'); // Отладочное сообщение

      setLoading(false);
    };

    loadContent();
  }, []);

  const renderGame = () => {
    switch (currentUniverse) {
      case 'EatsApp':
        return <EatsApp />;
      case 'First':
        return <EWE />;
      case 'EcoGame':
        return <EcoGame />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loading-screen">
          <img src="/load-image-3.png" alt="Loading..." />
        </div>
      ) : (
        <header className="App-header">
          <UniverseSwitcher currentUniverse={currentUniverse} setCurrentUniverse={setCurrentUniverse} />
          {renderGame()}
        </header>
      )}
    </div>
  );
}

export default App;
