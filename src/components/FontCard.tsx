import React from 'react';
import { useTheme, fontPalette } from '../contexts/ThemeContext';

interface FontCardProps {
  onClose: () => void;
}

const FontCard: React.FC<FontCardProps> = ({ onClose }) => {
  const { currentTheme, updateFont } = useTheme();

  const handleFontSelect = (font: string) => {
    updateFont(font);
  };

  // Extract colors for styling
  const primaryColor = currentTheme.primary.startsWith('linear-gradient') ? 
    currentTheme.primary.match(/#[a-fA-F0-9]{6}/)?.[0] || '#6b7280' : 
    currentTheme.primary;

  const secondaryColor = currentTheme.secondary.startsWith('linear-gradient') ? 
    currentTheme.secondary.match(/#[a-fA-F0-9]{6}/)?.[0] || '#ffffff' : 
    currentTheme.secondary;

  return (
    <div className="font-card">
      <div className="font-content" style={{
        background: currentTheme.primary.startsWith('linear-gradient') 
          ? currentTheme.primary 
          : `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primary} 100%)`
      }}>
        <div className="font-header" style={{
          background: currentTheme.primary.startsWith('linear-gradient') 
            ? currentTheme.primary 
            : `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primary} 100%)`
        }}>
          <h3 style={{ color: secondaryColor }}>Select Font</h3>
          <button 
            className="close-button" 
            onClick={onClose}
            style={{ color: secondaryColor }}
          >
            ×
          </button>
        </div>
        
        <div className="font-list">
          {fontPalette.map((font, index) => (
            <button
              key={index}
              className={`font-option ${currentTheme.font === font ? 'active' : ''}`}
              onClick={() => handleFontSelect(font)}
              style={{
                fontFamily: font,
                color: secondaryColor,
                background: currentTheme.font === font 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'transparent',
                border: currentTheme.font === font 
                  ? `2px solid ${secondaryColor}` 
                  : '2px solid transparent'
              }}
            >
              {font.split(',')[0]} - The quick brown fox
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FontCard;