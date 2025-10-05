import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  primary: string;
  secondary: string;
  outline: string;
  font: string;
}

export const fontPalette: string[] = [
  // Sans-serif fonts
  'Inter, sans-serif',
  'Roboto, sans-serif', 
  'Poppins, sans-serif',
  'Montserrat, sans-serif',
  'Open Sans, sans-serif',
  'Lato, sans-serif',
  'Source Sans Pro, sans-serif',
  'Nunito, sans-serif',
  'Ubuntu, sans-serif',
  'Raleway, sans-serif',
  'Work Sans, sans-serif',
  'Mukti, sans-serif',
  'Rubik, sans-serif',
  'Manrope, sans-serif',
  'Plus Jakarta Sans, sans-serif',
  'DM Sans, sans-serif',
  'Outfit, sans-serif',
  'Lexend, sans-serif',
  'Karla, sans-serif',
  'Quicksand, sans-serif',
  
  // Serif fonts
  'Playfair Display, serif',
  'Merriweather, serif',
  'Lora, serif',
  'Crimson Text, serif',
  'Cormorant Garamond, serif',
  'Libre Baskerville, serif',
  'Vollkorn, serif',
  'Cardo, serif',
  'Spectral, serif',
  'Bitter, serif',
  'Newsreader, serif',
  'Source Serif Pro, serif',
  'PT Serif, serif',
  'Georgia, serif',
  'Times New Roman, serif',
  
  // Monospace fonts
  'Fira Code, monospace',
  'JetBrains Mono, monospace',
  'Source Code Pro, monospace',
  'IBM Plex Mono, monospace',
  'Inconsolata, monospace',
  'Roboto Mono, monospace',
  'Anonymous Pro, monospace',
  'Courier New, monospace',
  
  // Display/Special fonts
  // 'Orbitron, sans-serif',
  'Righteous, cursive',
  'Comfortaa, cursive',
  'Pacifico, cursive',
  'Dancing Script, cursive',
  'Lobster, cursive',
  'Fredoka One, cursive',
  'Architects Daughter, cursive',
  'Caveat, cursive',
  'Satisfy, cursive',
  
  // System fonts
  'system-ui, sans-serif',
  '-apple-system, BlinkMacSystemFont, sans-serif',
  'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
];

export const colorPalette: string[] = [
  // Blues
  '#535bf2', '#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a',
  '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e',
  '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63',
  
  // Greens
  '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d',
  '#10b981', '#059669', '#047857', '#065f46', '#064e3b',
  '#84cc16', '#65a30d', '#4d7c0f', '#365314', '#1a2e05',
  
  // Purples & Violets
  '#a855f7', '#9333ea', '#7c3aed', '#6d28d9', '#5b21b6',
  '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95',
  '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75',
  
  // Reds & Pinks
  '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d',
  '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337',
  '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843',
  
  // Oranges & Yellows
  '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12',
  '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f',
  '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12',
  
  // Neutrals & Others
  '#64748b', '#475569', '#334155', '#1e293b', '#0f172a',
  '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827',
  '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b',
  '#000000', '#1a1a1a', '#2d2d2d', '#404040', '#ffffff'
];

export const gradientPalette: string[] = [
  // Blue Gradients
  'linear-gradient(135deg, #535bf2 0%, #000000 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
  'linear-gradient(135deg, #1d4ed8 0%, #000000 100%)',
  'linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #164e63 100%)',
  
  // Green Gradients
  'linear-gradient(135deg, #22c55e 0%, #000000 100%)',
  'linear-gradient(135deg, #16a34a 0%, #14532d 100%)',
  'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
  'linear-gradient(135deg, #84cc16 0%, #1a2e05 100%)',
  'linear-gradient(135deg, #65a30d 0%, #000000 100%)',
  
  // Purple Gradients
  'linear-gradient(135deg, #a855f7 0%, #000000 100%)',
  'linear-gradient(135deg, #9333ea 0%, #4c1d95 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #000000 100%)',
  'linear-gradient(135deg, #d946ef 0%, #701a75 100%)',
  'linear-gradient(135deg, #c026d3 0%, #000000 100%)',
  
  // Red & Pink Gradients
  'linear-gradient(135deg, #ef4444 0%, #000000 100%)',
  'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)',
  'linear-gradient(135deg, #f43f5e 0%, #881337 100%)',
  'linear-gradient(135deg, #ec4899 0%, #831843 100%)',
  'linear-gradient(135deg, #e11d48 0%, #000000 100%)',
  
  // Orange & Yellow Gradients
  'linear-gradient(135deg, #f97316 0%, #000000 100%)',
  'linear-gradient(135deg, #ea580c 0%, #7c2d12 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #78350f 100%)',
  'linear-gradient(135deg, #eab308 0%, #713f12 100%)',
  'linear-gradient(135deg, #d97706 0%, #000000 100%)',
  
  // Multi-color Gradients
  'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff8a80 0%, #ff80ab 100%)',
  
  // Sunset/Sunrise Gradients
  'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
  'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
  'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
  'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
  'linear-gradient(135deg, #e17055 0%, #f39c12 100%)',
  
  // Ocean/Sky Gradients
  'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
  'linear-gradient(135deg, #81ecec 0%, #74b9ff 100%)',
  'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
  'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
  'linear-gradient(135deg, #00b894 0%, #55efc4 100%)',
  
  // Nature Gradients
  'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
  'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
  'linear-gradient(135deg, #a4b0be 0%, #57606f 100%)',
  'linear-gradient(135deg, #ff7675 0%, #d63031 100%)',
  'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
  
  // Dark to Light Gradients
  'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
  'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)',
  'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
  'linear-gradient(135deg, #000000 0%, #434343 100%)',
  'linear-gradient(135deg, #373737 0%, #8e8e8e 100%)',
  
  // Metallic Gradients
  'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
  'linear-gradient(135deg, #c9d6ff 0%, #e2e2e2 100%)',
  'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
  'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)',
  'linear-gradient(135deg, #3a1c71 0%, #d76d77 100%)',
  
  // Neon/Electric Gradients
  'linear-gradient(135deg, #ff0084 0%, #33001b 100%)',
  'linear-gradient(135deg, #00ff41 0%, #000000 100%)',
  'linear-gradient(135deg, #0099f7 0%, #f11712 100%)',
  'linear-gradient(135deg, #7209b7 0%, #200122 100%)',
  'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  
  // Space/Galaxy Gradients
  'linear-gradient(135deg, #232526 0%, #414345 100%)',
  'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 100%)',
  'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
  'linear-gradient(135deg, #24243e 0%, #302b63 100%)',
  'linear-gradient(135deg, #200122 0%, #6f0000 100%)'
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  updatePrimary: (color: string) => void;
  updateSecondary: (color: string) => void;
  updateOutline: (color: string) => void;
  updateFont: (font: string) => void;
  resetTheme: () => void;
  clearSavedTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Function to get the initial theme (either from localStorage or fallback defaults)
const getInitialTheme = (): Theme => {
  try {
    const savedTheme = localStorage.getItem('workwise-theme');
    if (savedTheme) {
      const theme = JSON.parse(savedTheme);
      if (theme && typeof theme === 'object' && theme.primary && theme.secondary && theme.outline) {
        // Add font property if missing (for backward compatibility)
        if (!theme.font) {
          theme.font = 'Inter, sans-serif';
        }
        console.log('🔄 Using saved theme as initial:', theme);
        return theme;
      }
    }
  } catch (e) {
    console.error('❌ Error reading saved theme:', e);
  }
  
  // Fallback defaults if no valid saved theme
  const fallbackTheme = {
    primary: '#6b7280',
    secondary: '#ffffff',
    outline: '#000000',
    font: 'Inter, sans-serif'
  };
  console.log('🔄 Using fallback theme as initial:', fallbackTheme);
  return fallbackTheme;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Apply theme to CSS variables
    const applyColor = (property: string, color: string) => {
      let gradientValue: string;
      let fallbackColor: string;
      
      if (color.startsWith('linear-gradient')) {
        // Already a gradient
        gradientValue = color;
        fallbackColor = color.match(/#[a-fA-F0-9]{6}/)?.[0] || color;
      } else {
        // Convert solid color to gradient (color to same color)
        gradientValue = `linear-gradient(135deg, ${color} 0%, ${color} 100%)`;
        fallbackColor = color;
      }
      
      document.documentElement.style.setProperty(`${property}-gradient`, gradientValue);
      document.documentElement.style.setProperty(property, fallbackColor);
    };

    applyColor('--color-primary', currentTheme.primary);
    applyColor('--color-secondary', currentTheme.secondary);
    applyColor('--color-outline', currentTheme.outline);
    
    // Apply font family
    document.documentElement.style.setProperty('--font-family', currentTheme.font);
    
    // Always use gradient styling for text since all colors are now gradients
    const secondaryGradient = currentTheme.secondary.startsWith('linear-gradient') 
      ? currentTheme.secondary 
      : `linear-gradient(135deg, ${currentTheme.secondary} 0%, ${currentTheme.secondary} 100%)`;
      
    document.documentElement.style.setProperty('--text-style', secondaryGradient);
    document.documentElement.style.setProperty('--text-color', 'transparent');
    document.documentElement.style.setProperty('--text-clip', 'text');
    
    // Save to localStorage with error handling
    try {
      const themeString = JSON.stringify(currentTheme);
      localStorage.setItem('workwise-theme', themeString);
      console.log('💾 Theme saved to localStorage:', currentTheme);
      console.log('📄 Saved as:', themeString);
      
      // Verify the save worked
      const verification = localStorage.getItem('workwise-theme');
      if (verification === themeString) {
        console.log('✅ Save verification successful');
      } else {
        console.error('❌ Save verification failed');
      }
    } catch (e) {
      console.error('❌ Failed to save theme to localStorage:', e);
      alert('Warning: Theme could not be saved. Your changes may be lost on refresh.');
    }
  }, [currentTheme]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const updatePrimary = (color: string) => {
    console.log('🎨 Updating primary color to:', color);
    // Prevent primary from being the same as secondary
    if (color === currentTheme.secondary) {
      console.warn('⚠️ Primary and secondary colors cannot be the same');
      return;
    }
    setCurrentTheme(prev => ({ ...prev, primary: color }));
  };

  const updateSecondary = (color: string) => {
    console.log('🎨 Updating secondary color to:', color);
    // Prevent secondary from being the same as primary
    if (color === currentTheme.primary) {
      console.warn('⚠️ Primary and secondary colors cannot be the same');
      return;
    }
    setCurrentTheme(prev => ({ ...prev, secondary: color }));
  };

  const updateOutline = (color: string) => {
    console.log('🎨 Updating outline color to:', color);
    setCurrentTheme(prev => ({ ...prev, outline: color }));
  };

  const updateFont = (font: string) => {
    console.log('🔤 Updating font to:', font);
    setCurrentTheme(prev => ({ ...prev, font }));
  };

  const resetTheme = () => {
    const fallbackTheme = {
      primary: '#6b7280',
      secondary: '#ffffff',
      outline: '#000000',
      font: 'Inter, sans-serif'
    };
    setCurrentTheme(fallbackTheme);
  };

  const clearSavedTheme = () => {
    localStorage.removeItem('workwise-theme');
    const fallbackTheme = {
      primary: '#6b7280',
      secondary: '#ffffff',
      outline: '#000000',
      font: 'Inter, sans-serif'
    };
    setCurrentTheme(fallbackTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      updatePrimary, 
      updateSecondary, 
      updateOutline,
      updateFont,
      resetTheme,
      clearSavedTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};