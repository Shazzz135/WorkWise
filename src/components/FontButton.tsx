import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import FontCard from './FontCard';

const FontButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme } = useTheme();

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  const closeCard = () => {
    setIsOpen(false);
  };

  // Extract color for the font preview (use secondary color)
  const previewColor = currentTheme.secondary.startsWith('linear-gradient') ? 
    currentTheme.secondary.match(/#[a-fA-F0-9]{6}/)?.[0] || '#646cff' : 
    currentTheme.secondary;

  return (
    <div className="font-button-container">
      <button 
        className="font-button" 
        onClick={toggleCard}
        style={{
          background: currentTheme.primary.startsWith('linear-gradient') 
            ? currentTheme.primary 
            : `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primary} 100%)`,
          color: previewColor,
          fontFamily: currentTheme.font
        }}
      >
        Aa
      </button>
      {isOpen && <FontCard onClose={closeCard} />}
    </div>
  );
};

export default FontButton;