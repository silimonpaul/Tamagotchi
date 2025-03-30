import React, { useState } from 'react';
import styled from 'styled-components';
import Pet from '../components/Pet';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Game = () => {
  const [pet] = useState({
    name: 'Tamagotchi',
    type: 'basic',
    level: 1,
  });

  const handlePetAction = (action) => {
    // Here we'll add multiplayer sync logic later
    console.log(`Pet action: ${action}`);
  };

  return (
    <GameContainer>
      <Pet petData={pet} onAction={handlePetAction} />
    </GameContainer>
  );
};

export default Game;