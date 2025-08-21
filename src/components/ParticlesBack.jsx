// src/ParticlesTest.jsx

import React from 'react';
import Particles from 'react-particles';
import { particlesOptions } from './particlesOptions';

export default function ParticlesBack() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      backgroundColor: 'transparent' // Assicura che non ci sia uno sfondo solido
    }}>
      <Particles options={particlesOptions} />
    </div>
  );
}