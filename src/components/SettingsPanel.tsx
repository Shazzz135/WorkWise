import React, { useState } from 'react';
import { useTheme, colorPalette, gradientPalette, fontPalette } from '../contexts/ThemeContext';

interface SettingsPanelProps {
  onClose: () => void;
}

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  activeTab: 'primary' | 'secondary' | 'outline';
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorSelect, activeTab }) => {
  const [showGradients, setShowGradients] = useState(false);
  const { currentTheme } = useTheme();
  
  // FORCE solid colors for outline - NO gradients allowed
  const isOutlineTab = activeTab === 'outline';
  const actualShowGradients = !isOutlineTab && showGradients;
  const palette = actualShowGradients ? gradientPalette : colorPalette;

  const secondaryColor = currentTheme.secondary.startsWith('linear-gradient') ? 
    currentTheme.secondary.match(/#[a-fA-F0-9]{6}/)?.[0] || '#646cff' : 
    currentTheme.secondary;

  // Check if a color is disabled (conflicts with another color)
  const isColorDisabled = (color: string) => {
    if (activeTab === 'primary') {
      return color === currentTheme.secondary;
    } else if (activeTab === 'secondary') {
      return color === currentTheme.primary;
    }
    return false;
  };

  return (
    <div className="color-picker">
      {/* HIDE gradient toggle completely for outline tab */}
      {!isOutlineTab && (
        <div className="color-picker-header" style={{
          background: 'rgba(255, 255, 255, 0.1)'
        }}>
          <button 
            className={`picker-toggle ${!showGradients ? 'active' : ''}`}
            onClick={() => setShowGradients(false)}
            style={!showGradients ? {
              background: 'rgba(255, 255, 255, 0.2)',
              color: secondaryColor
            } : {
              color: `${secondaryColor}80`
            }}
          >
            Solid
          </button>
          <button 
            className={`picker-toggle ${showGradients ? 'active' : ''}`}
            onClick={() => setShowGradients(true)}
            style={showGradients ? {
              background: 'rgba(255, 255, 255, 0.2)',
              color: secondaryColor
            } : {
              color: `${secondaryColor}80`
            }}
          >
            Gradient
          </button>
        </div>
      )}
      <div className="color-grid">
        {palette.map((color, index) => {
          const isDisabled = isColorDisabled(color);
          return (
            <button
              key={index}
              className={`color-swatch ${selectedColor === color ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              style={{
                background: actualShowGradients ? color : color,
                border: selectedColor === color ? `3px solid ${secondaryColor}` : '2px solid transparent',
                position: 'relative',
                opacity: isDisabled ? 0.5 : 1
              }}
              onClick={() => !isDisabled && onColorSelect(color)}
              title={isDisabled ? 'Cannot use same color for primary and secondary' : color}
              disabled={isDisabled}
            >
              {isDisabled && (
                <div style={{
                  position: 'absolute',
                  top: '40%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '40px',
                  fontWeight: 'bold',
                  color: '#000000',
                  textShadow: '0 0 3px #ffffff, 0 0 6px #ffffff, 1px 1px 0 #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  lineHeight: '1'
                }}>
                  ×
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const { currentTheme, updatePrimary, updateSecondary, updateOutline, updateFont } = useTheme();
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary' | 'outline'>('primary');

  const secondaryColor = currentTheme.secondary.startsWith('linear-gradient') ? 
    currentTheme.secondary.match(/#[a-fA-F0-9]{6}/)?.[0] || '#ffffff' : 
    currentTheme.secondary;

  const handleFontSelect = (font: string) => {
    updateFont(font);
  };

  const getCurrentColorForTab = () => {
    switch (activeTab) {
      case 'primary': return currentTheme.primary;
      case 'secondary': return currentTheme.secondary;
      case 'outline': return currentTheme.outline;
    }
  };

  const getCurrentUpdateFunction = () => {
    switch (activeTab) {
      case 'primary': return updatePrimary;
      case 'secondary': return updateSecondary;
      case 'outline': return updateOutline;
    }
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div 
        className="settings-panel-split" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: currentTheme.primary.startsWith('linear-gradient') 
            ? currentTheme.primary 
            : `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primary} 100%)`,
          border: `2px solid ${currentTheme.outline}`,
          transform: 'scale(0.9)',
          transformOrigin: 'center'
        }}
      >
        <div className="settings-header-split">
          <h3 style={{ color: secondaryColor }}>Settings</h3>
          <button 
            className="close-button" 
            onClick={onClose}
            style={{ 
              color: secondaryColor,
              width: '40px',
              height: '40px',
              padding: '0',
              margin: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >
            ×
          </button>
        </div>
        
        <div className="settings-content-split">
          {/* Left Side - Theme Colors */}
          <div className="settings-left">
            <h4 style={{ color: secondaryColor, textDecoration: 'underline' }}>Theme Colors</h4>
            
            {/* Theme Tabs */}
            <div className="theme-tabs" style={{ background: currentTheme.primary }}>
              <button 
                className={`tab ${activeTab === 'primary' ? 'active' : ''}`}
                onClick={() => setActiveTab('primary')}
                style={activeTab === 'primary' ? { 
                  color: secondaryColor,
                  borderBottomColor: secondaryColor,
                  background: 'rgba(255, 255, 255, 0.1)'
                } : {
                  color: `${secondaryColor}80`
                }}
              >
                Primary
                <div className="tab-color-preview" style={
                  currentTheme.primary.startsWith('linear-gradient') ? 
                    { background: currentTheme.primary } : 
                    { backgroundColor: currentTheme.primary }
                } />
              </button>
              <button 
                className={`tab ${activeTab === 'secondary' ? 'active' : ''}`}
                onClick={() => setActiveTab('secondary')}
                style={activeTab === 'secondary' ? { 
                  color: secondaryColor,
                  borderBottomColor: secondaryColor,
                  background: 'rgba(255, 255, 255, 0.1)'
                } : {
                  color: `${secondaryColor}80`
                }}
              >
                Secondary
                <div className="tab-color-preview" style={
                  currentTheme.secondary.startsWith('linear-gradient') ? 
                    { background: currentTheme.secondary } : 
                    { backgroundColor: currentTheme.secondary }
                } />
              </button>
              <button 
                className={`tab ${activeTab === 'outline' ? 'active' : ''}`}
                onClick={() => setActiveTab('outline')}
                style={activeTab === 'outline' ? { 
                  color: secondaryColor,
                  borderBottomColor: secondaryColor,
                  background: 'rgba(255, 255, 255, 0.1)'
                } : {
                  color: `${secondaryColor}80`
                }}
              >
                Outline
                <div className="tab-color-preview" style={
                  currentTheme.outline.startsWith('linear-gradient') ? 
                    { background: currentTheme.outline } : 
                    { backgroundColor: currentTheme.outline }
                } />
              </button>
            </div>

            {/* Color Picker */}
            <ColorPicker 
              selectedColor={getCurrentColorForTab()}
              onColorSelect={getCurrentUpdateFunction()}
              activeTab={activeTab}
            />
          </div>
          
          {/* Right Side - Typography */}
          <div className="settings-right">
            <h4 style={{ color: secondaryColor, textDecoration: 'underline' }}>Typography</h4>
            
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
                      : '2px solid transparent',
                    fontSize: '2em',
                    padding: '1rem'
                  }}
                >
                  {font.split(',')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;