import React, { useState, useEffect, useRef } from 'react';
import './EatsApp.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UpgradeTab from './components/UpgradeTab';
import BoostTab from './components/BoostTab';
import TasksTab from './components/TasksTab';
import SettingsButton from './components/SettingsButton';
import clickerImage from '../public/clicker-image.png'
import bgVid from '../public/bg.mp4'
import {
  handleClick,
  handleDamageUpgrade,
  handleEnergyUpgrade,
  handleRegenUpgrade,
  handleMouseDown,
  handleMouseUp
} from './scripts/functions';

function EatsApp({ setIsTabOpen }) {
  const [count, setCount] = useState(0);
  const [totalClicks, setTotalClicks] = useState(() => {
    const saved = localStorage.getItem('totalClicks');
    return saved !== null ? JSON.parse(saved) : 100000000;
  });
  const [activeTab, setActiveTab] = useState(null);
  const [isImageDistorted, setIsImageDistorted] = useState(false);
  const [pointsPerClick, setPointsPerClick] = useState(1);
  const [isClicking, setIsClicking] = useState(false);
  const [isTabOpen, setIsTabOpenState] = useState(false); // Местное состояние для вкладок
  const [showButtons, setShowButtons] = useState(true);

  const [energy, setEnergy] = useState(() => {
    const saved = localStorage.getItem('energy');
    return saved !== null ? JSON.parse(saved) : 1000;
  });
  const [energyMax, setEnergyMax] = useState(() => {
    const saved = localStorage.getItem('energyMax');
    return saved !== null ? JSON.parse(saved) : 1000;
  });
  const [regenRate, setRegenRate] = useState(() => {
    const saved = localStorage.getItem('regenRate');
    return saved !== null ? JSON.parse(saved) : 1;
  });

  const [damageLevel, setDamageLevel] = useState(() => {
    const saved = localStorage.getItem('damageLevel');
    return saved !== null ? JSON.parse(saved) : 1;
  });
  const [energyLevel, setEnergyLevel] = useState(() => {
    const saved = localStorage.getItem('energyLevel');
    return saved !== null ? JSON.parse(saved) : 1;
  });
  const [regenLevel, setRegenLevel] = useState(() => {
    const saved = localStorage.getItem('regenLevel');
    return saved !== null ? JSON.parse(saved) : 1;
  });

  const damageUpgradeCost = 1000 * Math.pow(2, damageLevel - 1);
  const energyUpgradeCost = 1000 * Math.pow(2, energyLevel - 1);
  const regenUpgradeCost = 50000 * Math.pow(2, regenLevel - 1);

  const activityTimeoutRef = useRef(null);

  useEffect(() => {
    const lastUpdate = localStorage.getItem('lastUpdate');
    if (lastUpdate) {
      const elapsedSeconds = Math.floor((Date.now() - new Date(lastUpdate)) / 1000);
      const regenAmount = Math.min(elapsedSeconds * regenRate, energyMax - energy);
      setEnergy((prevEnergy) => Math.min(prevEnergy + regenAmount, energyMax));
    }
  }, [regenRate, energyMax]);

  useEffect(() => {
    const regenInterval = setInterval(() => {
      if (!isClicking && regenRate > 0 && energy < energyMax) {
        setEnergy((prevEnergy) => Math.min(prevEnergy + regenRate, energyMax));
        localStorage.setItem('lastUpdate', new Date().toISOString());
      }
    }, 1000);
    return () => clearInterval(regenInterval);
  }, [isClicking, regenRate, energy, energyMax]);

  useEffect(() => {
    localStorage.setItem('totalClicks', JSON.stringify(totalClicks));
  }, [totalClicks]);

  useEffect(() => {
    localStorage.setItem('energy', JSON.stringify(energy));
  }, [energy]);

  useEffect(() => {
    localStorage.setItem('energyMax', JSON.stringify(energyMax));
  }, [energyMax]);

  useEffect(() => {
    localStorage.setItem('regenRate', JSON.stringify(regenRate));
  }, [regenRate]);

  useEffect(() => {
    localStorage.setItem('damageLevel', JSON.stringify(damageLevel));
  }, [damageLevel]);

  useEffect(() => {
    localStorage.setItem('energyLevel', JSON.stringify(energyLevel));
  }, [energyLevel]);

  useEffect(() => {
    localStorage.setItem('regenLevel', JSON.stringify(regenLevel));
  }, [regenLevel]);

  const handleTabOpen = (tab) => {
    setActiveTab(tab);
    setIsTabOpenState(true);
    setIsTabOpen(true); // Передаем состояние в UniverseSwitcher
    setShowButtons(false);
  };

  const handleBackButtonClick = () => {
    setActiveTab(null);
    setIsTabOpenState(false);
    setIsTabOpen(false); // Передаем состояние в UniverseSwitcher
    setShowButtons(true);
  };

  const tabContent = (() => {
    switch (activeTab) {
      case 'UPGRADE':
        return (
          <UpgradeTab
            totalClicks={totalClicks}
            damageUpgradeCost={damageUpgradeCost}
            energyUpgradeCost={energyUpgradeCost}
            regenUpgradeCost={regenUpgradeCost}
            damageLevel={damageLevel}
            energyLevel={energyLevel}
            regenLevel={regenLevel}
            handleDamageUpgrade={() => handleDamageUpgrade(totalClicks, damageUpgradeCost, setTotalClicks, setPointsPerClick, setDamageLevel, pointsPerClick, damageLevel)}
            handleEnergyUpgrade={() => handleEnergyUpgrade(totalClicks, energyUpgradeCost, setTotalClicks, setEnergyMax, setEnergyLevel, energyMax, energyLevel)}
            handleRegenUpgrade={() => handleRegenUpgrade(totalClicks, regenUpgradeCost, setTotalClicks, setRegenRate, setRegenLevel, regenRate, regenLevel)}
          />
        );
      case 'BOOST':
        return <BoostTab />;
      case 'TASKS':
        return <TasksTab />;
      default:
        return null;
    }
  })();

  const remainingEnergyPercentage = ((energyMax - energy) / energyMax) * 100;

  return (
    <div className={`App`} onMouseDown={() => handleMouseDown(setIsClicking)} onMouseUp={() => handleMouseUp(setIsClicking, activityTimeoutRef, setIsImageDistorted, isClicking)}>
      <header className="App-header">
        <div className="video-background">
          <video autoPlay muted loop className="video">
            <source src={bgVid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <SettingsButton isActive={activeTab !== null} /> 
        <div className="balance-container">
          <img src={clickerImage} alt="Balance Icon" className="balance-icon" />
          <p>{totalClicks}</p>
        </div>
        <div className="energy-container">
          <p>Energy: {energy}/{energyMax}</p>
        </div>
        <div className="clicker-container" onClick={() => handleClick(energy, damageLevel, count, totalClicks, pointsPerClick, setCount, setTotalClicks, setEnergy, setIsImageDistorted, activityTimeoutRef, setRegenRate)}>
            <img src={clickerImage} alt="Clicker" className={`clicker-image ${isImageDistorted ? 'distorted' : ''}`} />
          <div className="progress-circle" style={{ boxShadow: '0px 0px 10px 5px gray' }}>
            <CircularProgressbar
              value={remainingEnergyPercentage}
              maxValue={100}
              styles={buildStyles({
                pathColor: 'purple',
                textColor: '#fff',
                trailColor: 'greenyellow',
                backgroundColor: '#3e98c7',
              })}
            />
          </div>
        </div>
        {showButtons && (
          <div className="tabs">
            <button className={activeTab === 'UPGRADE' ? 'active' : ''} onClick={() => handleTabOpen('UPGRADE')}>
              UPGRADE
            </button>
            <button className={activeTab === 'BOOST' ? 'active' : ''} onClick={() => handleTabOpen('BOOST')}>
              BOOSTS
            </button>
            <button className={activeTab === 'TASKS' ? 'active' : ''} onClick={() => handleTabOpen('TASKS')}>
              TASKS
            </button>
          </div>
        )}
        {isTabOpen && (
          <div className={`tab-content ${isTabOpen ? 'open' : ''}`}>
            <button className="back-button" onClick={handleBackButtonClick}>Back</button>
            {tabContent}
          </div>
        )}
      </header>
    </div>
  );
}

export default EatsApp;
