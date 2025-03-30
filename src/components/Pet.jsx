import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const blink = keyframes`
  0% { opacity: 1; }
  49% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const popUp = keyframes`
  0% { transform: translate(-50%, -50%) scale(0); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
  100% { transform: translate(-50%, -50%) scale(1); }
`;

const RetroScreen = styled.div`
  background-color: #9BA94C;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  margin: 0 auto;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
  font-family: 'Courier New', monospace;
  color: #1C2910;
  position: relative;
  transform: translateY(-50px); // Adjust this value to fine-tune vertical position
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(255, 255, 255, 0.1) 50%,
      transparent 50%
    );
    background-size: 4px 4px;
    pointer-events: none;
  }
`;

const PetDisplay = styled.pre`
  text-align: center;
  font-size: 12px;
  line-height: 1;
  margin: 20px 0;
  white-space: pre;
  animation: ${bounce} 2s ease-in-out infinite;
  
  ${props => props.$sleeping && css`
    animation: ${blink} 3s linear infinite;
    opacity: 0.7;
  `}
`;

const ActionEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  opacity: ${props => props.$show ? 1 : 0};
  animation: ${props => props.$show ? css`${popUp} 0.5s ease-out` : 'none'};
`;

const StatsBar = styled.div`
  background: #1C2910;
  height: 10px;
  border-radius: 5px;
  margin: 5px 0;
  overflow: hidden;
`;

const StatsFill = styled.div`
  background: #4A5A23;
  height: 100%;
  width: ${props => props.value}%;
  transition: width 0.3s ease;
`;

const Button = styled.button`
  background: #4A5A23;
  border: 2px solid #1C2910;
  color: #9BA94C;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  
  &:hover {
    background: #1C2910;
  }
`;

const Pet = ({ petData, onAction }) => {
  const [stats, setStats] = useState({
    hunger: 100,
    happiness: 100,
    energy: 100,
  });
  const [action, setAction] = useState(null);
  const [isSleeping, setIsSleeping] = useState(false);

  const happyPet = `
    ʕ•ᴥ•ʔ
   /|    |\\
    |    |
    \\____/
  `;

  const sleepyPet = `
    ʕ-ᴥ-ʔ
   /|    |\\
    |    |
    \\____/
  `;

  const sadPet = `
    ʕ•̯ᴥ•̯ʔ
   /|    |\\
    |    |
    \\____/
  `;

  const sleepingPet = `
    ʕ-.-ʔ
   /|zZz|\\
    |    |
    \\____/
  `;

  const getPetMood = () => {
    if (isSleeping) return sleepingPet;
    const average = (stats.hunger + stats.happiness + stats.energy) / 3;
    if (average > 70) return happyPet;
    if (average > 30) return sleepyPet;
    return sadPet;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSleeping) {
        setStats(prev => ({
          hunger: Math.max(0, prev.hunger - 1),
          happiness: Math.max(0, prev.happiness - 0.5),
          energy: Math.max(0, prev.energy - 0.7),
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isSleeping]);

  const showActionEffect = (actionType) => {
    setAction(actionType);
    setTimeout(() => setAction(null), 1000);
  };

  const handleFeed = () => {
    if (!isSleeping) {
      onAction('feed');
      showActionEffect('🍖');
      setStats(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 20),
      }));
    }
  };

  const handlePlay = () => {
    if (!isSleeping) {
      onAction('play');
      showActionEffect('❤️');
      setStats(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 15),
        energy: Math.max(0, prev.energy - 10),
      }));
    }
  };

  const handleSleep = () => {
    onAction('sleep');
    setIsSleeping(true);
    showActionEffect('💤');
    setTimeout(() => setIsSleeping(false), 3000);
    setStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 30),
    }));
  };

  return (
    <RetroScreen>
      <h3>♥ {petData.name} ♥</h3>
      <PetDisplay $sleeping={isSleeping}>{getPetMood()}</PetDisplay>
      <ActionEffect $show={action}>{action}</ActionEffect>
      
      <div>Hunger:</div>
      <StatsBar>
        <StatsFill value={stats.hunger} />
      </StatsBar>
      
      <div>Happiness:</div>
      <StatsBar>
        <StatsFill value={stats.happiness} />
      </StatsBar>
      
      <div>Energy:</div>
      <StatsBar>
        <StatsFill value={stats.energy} />
      </StatsBar>
      
      <div>
        <Button onClick={handleFeed} disabled={isSleeping}>🍖 Feed</Button>
        <Button onClick={handlePlay} disabled={isSleeping}>🎮 Play</Button>
        <Button onClick={handleSleep}>💤 Sleep</Button>
      </div>
    </RetroScreen>
  );
};

export default Pet;