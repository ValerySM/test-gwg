import React, { useState, useEffect } from 'react';
import './PurblePairs.css';
import backgroundMusicFile from './audio/pokemonGym.mp3';
import winEffectFile from './audio/win.mp3';
import startButtonSound from './audio/start.mp3';
import cardClickSound from './audio/card.mp3';

// Импортируем изображения
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';
import img6 from './img/6.png';
import img7 from './img/7.png';
import img8 from './img/8.png';

// Базовая коллекция карт
const baseCollection = [
    { id: 1, art: img1 },
    { id: 2, art: img2 },
    { id: 3, art: img3 },
    { id: 4, art: img4 },
    { id: 5, art: img5 },
    { id: 6, art: img6 },
    { id: 7, art: img7 },
    { id: 8, art: img8 },
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const PurblePairs = ({ onVictory }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [isWin, setIsWin] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [timer, setTimer] = useState(999);
    const [showMessage, setShowMessage] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        const doubledCards = shuffleArray([...baseCollection, ...baseCollection].map(card => ({
            ...card,
            isFlipped: false,
            isMatched: false
        })));
        setCards(doubledCards);
    }, []);

    useEffect(() => {
        let interval;
        if (isGameStarted && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsGameStarted(false);
            setMessageText("Time's up! You lost.");
            setShowMessage(true);
        }
        return () => clearInterval(interval);
    }, [isGameStarted, timer]);

    useEffect(() => {
        const audio = new Audio(backgroundMusicFile);
        audio.loop = true;

        const playAudio = () => {
            audio.play().catch(error => console.error('Ошибка при воспроизведении фоновой музыки:', error));
        };

        playAudio();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                audio.pause();
            } else {
                playAudio();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            audio.pause();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play().catch(error => console.error('Ошибка при воспроизведении звука:', error));
    };

    const startGame = () => {
        playSound(startButtonSound); // Воспроизведение звука при нажатии кнопки "Start"
        setIsWin(false);
        setTimer(999);
        setScore(0); // Сброс счёта при начале игры
        setIsGameStarted(true);
        setMatchedPairs([]);
        setFlippedCards([]);
        setShowMessage(false);
        const shuffledCards = shuffleArray([...baseCollection, ...baseCollection].map(card => ({
            ...card,
            isFlipped: false,
            isMatched: false
        })));
        setCards(shuffledCards);
    };

    const handleCardClick = (index) => {
        if (!isGameStarted || cards[index].isFlipped || cards[index].isMatched) return;

        playSound(cardClickSound); // Воспроизведение звука при нажатии на карточку

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstIndex, secondIndex] = newFlippedCards;
            if (newCards[firstIndex].id === newCards[secondIndex].id) {
                newCards[firstIndex].isMatched = true;
                newCards[secondIndex].isMatched = true;
                setMatchedPairs([...matchedPairs, newCards[firstIndex].id]);
                // Увеличиваем счёт на 10
                setScore(prevScore => prevScore + 10);
            } else {
                setTimeout(() => {
                    newCards[firstIndex].isFlipped = false;
                    newCards[secondIndex].isFlipped = false;
                    setCards(newCards);
                }, 800); // Закрываются за 0.8 секунд
            }
            setFlippedCards([]);
        }
    };

    useEffect(() => {
        if (matchedPairs.length === baseCollection.length) {
            setIsWin(true);
            setIsGameStarted(false);
            setMessageText("You Win!");
            setShowMessage(true);
            playSound(winEffectFile);
            onVictory();
        }
    }, [matchedPairs, onVictory]);

    return (
        <div className="purble-pairs">
            <div className="game-header">
                <div className="timer">Time:<p className='timerBtn'>{timer}</p></div>
                <div className='score'>Score:<p className='scoreBtn'>{score}</p></div>
            </div>
            <button className='btn-game' onClick={startGame}>Start</button>
            <div className="cards">
                <div className='cards-grid'>
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            <div className="card-front">
                                <img className='card-img' src={card.art} alt={`Card ${card.id}`} />
                            </div>
                            <div className="card-back">
                                <span className='back-descr'>Open</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showMessage && <div className="message">{messageText}</div>}
        </div>
    );
};

export default PurblePairs;
