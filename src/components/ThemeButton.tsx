import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeCard from './ThemeCard';

const ThemeButton: React.FC = () => {
  const { currentTheme } = useTheme();
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <div className="theme-button-container">
      <button 
        className="theme-button" 
        onClick={() => setIsCardOpen(!isCardOpen)}
        title="Customize theme colors"
      >
        <div className="color-preview">
          <div className="color-dot" style={{ backgroundColor: currentTheme.primary }} title="Primary"></div>
          <div className="color-dot" style={{ backgroundColor: currentTheme.secondary }} title="Secondary"></div>
          <div className="color-dot" style={{ backgroundColor: currentTheme.outline }} title="Outline"></div>
        </div>
      </button>
      
      {isCardOpen && (
        <ThemeCard 
          onClose={() => setIsCardOpen(false)} 
        />
      )}
    </div>
  );
};

export default ThemeButton;