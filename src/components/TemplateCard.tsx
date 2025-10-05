import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface TemplateCardProps {
  title?: string;
  subtitle?: string;
  jobType?: string;
  term?: string;
  length?: string;
  location?: string;
  details?: string;
  showRemoveButton?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  status?: string;
  interest?: number;
  link?: string;
  onStatusChange?: (status: 'not-applied' | 'applied' | 'accepted' | 'rejected') => void;
  onInterestChange?: (interest: number) => void;
  onLinkChange?: (link: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title = "Software Engineer",
  subtitle = "Tech Company Inc.",
  jobType = "Full-time",
  term = "Fall",
  length = "6 months",
  location = "San Francisco, CA",
  details = "Experienced full-stack developer with 5+ years in React, Node.js, and cloud technologies. Strong problem-solving skills and passion for building scalable applications. Excited to contribute to innovative projects.",
  showRemoveButton = true,
  onClick,
  onRemove,
  status = 'Applied',
  interest = 5,
  link = "https://company.com/jobs/123",
  onStatusChange,
  onInterestChange,
  onLinkChange
}) => {
  const { currentTheme } = useTheme();
  
  // Local state for the template card (interest and link only)
  const [localInterest, setLocalInterest] = useState(interest);
  const [localLink, setLocalLink] = useState(link);
  const [localStatus, setLocalStatus] = useState(status);

  // ...existing code...

  // Extract solid color from gradient or use as-is if already solid
  const getTextColor = (color: string) => {
    if (color.startsWith('linear-gradient')) {
      // Extract the first hex color from the gradient
      const hexMatch = color.match(/#[a-fA-F0-9]{6}/);
      return hexMatch ? hexMatch[0] : color;
    }
    return color;
  };

  const textColor = getTextColor(currentTheme.secondary);

  const handleClick = () => {
    // Removed alert prompt - card click now does nothing
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      const confirmed = window.confirm('Are you sure you want to delete this card?');
      if (confirmed) {
        onRemove();
      }
    }
  };

  return (
    <div 
      className="template-card" 
      onClick={handleClick}
      style={{
        background: currentTheme.primary,
        fontFamily: currentTheme.font,
        boxShadow: `0 4px 12px ${currentTheme.outline}20`,
        borderRadius: '16px',
        border: `2px solid ${getTextColor(currentTheme.outline)}`,
        padding: '1.5rem',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        position: 'relative',
        color: currentTheme.secondary,
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
  marginTop: '0px'
      }}
    >
      {/* Single Container - All Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.35rem', // reduced gap to move subtitle/job type and term/length/location closer
        alignItems: 'flex-start',
        width: '100%',
        justifyContent: 'space-between'
      }}>
        {/* Job Title with X Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%'
        }}>
          <h3 
            style={{ 
              margin: 0,
              fontSize: '1.375rem',
              fontWeight: '700',
              lineHeight: 1.2,
              textShadow: `0 2px 3px ${getTextColor(currentTheme.outline)}60`,
              color: textColor,
              fontFamily: currentTheme.font,
              textAlign: 'left',
              flex: 1,
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.textShadow = `0 3px 6px ${getTextColor(currentTheme.outline)}80`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.textShadow = `0 2px 3px ${getTextColor(currentTheme.outline)}60`;
            }}
          >
            {title}
          </h3>
          
          {/* X Button next to title */}
          {showRemoveButton && (
            <button 
              onClick={handleRemove}
              aria-label="Remove template"
              style={{ 
                color: getTextColor(currentTheme.primary),
                width: '60px',
                height: '40px',
                padding: '0',
                margin: '0',
                marginLeft: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${currentTheme.outline}`,
                borderRadius: '12px',
                background: currentTheme.secondary,
                cursor: 'pointer',
                fontSize: '24px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                opacity: '1',
                visibility: 'visible',
                boxShadow: `0 4px 12px ${currentTheme.outline}30`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${currentTheme.outline}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${currentTheme.outline}30`;
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Company Name with job type */}
        <p 
          style={{ 
            margin: 0,
            fontSize: '1rem',
            opacity: 0.95,
            fontWeight: '600',
            textShadow: `0 1px 3px ${getTextColor(currentTheme.outline)}50`,
            color: textColor,
            fontFamily: currentTheme.font,
            textAlign: 'left',
            width: '100%',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.textShadow = `0 2px 4px ${getTextColor(currentTheme.outline)}70`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '0.95';
            e.currentTarget.style.textShadow = `0 1px 3px ${getTextColor(currentTheme.outline)}50`;
          }}
        >
          {subtitle} {jobType ? `| ${jobType}` : ''}
        </p>

        {/* Term, Length and Location badge */}
        <div 
          style={{ 
            fontSize: '1rem',
            display: 'block',
            letterSpacing: '0.5px',
            color: textColor,
            fontFamily: currentTheme.font,
            fontWeight: '600',
            textAlign: 'left',
            margin: 0,
            padding: 0,
            width: '100%',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            textShadow: `0 1px 3px ${getTextColor(currentTheme.outline)}50`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.letterSpacing = '0.8px';
            e.currentTarget.style.textShadow = `0 2px 4px ${getTextColor(currentTheme.outline)}70`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.letterSpacing = '0.5px';
            e.currentTarget.style.textShadow = `0 1px 3px ${getTextColor(currentTheme.outline)}50`;
          }}
        >
          {term ? term : ''}{term && length ? ' | ' : ''}{length ? length : ''}{(term || length) && location ? ' | ' : ''}{location ? location : ''}
        </div>

        {/* Details section - User input limited to 200 characters for formatting */}
        <div 
          style={{ 
            fontSize: '0.92rem',
            fontWeight: '600',
            letterSpacing: '0.5px',
            color: textColor,
            fontFamily: currentTheme.font,
            textAlign: 'left',
            margin: 0,
            padding: '0.8rem',
            width: '100%',
            minHeight: '4.5rem',
            maxHeight: '8.5rem',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line',
            border: `1px solid ${getTextColor(currentTheme.outline)}`,
            borderRadius: '6px',
            boxSizing: 'border-box',
            textShadow: `0 1px 2px ${getTextColor(currentTheme.outline)}30`,
            overflowY: 'auto',
          }}
        >
          {details}
        </div>

        {/* Link, Interest, and Status Row */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%',
          gap: '0.75rem',
          marginTop: '1.2rem' // move row lower
        }}>
          {/* Link Button - Left */}
          <button
            onClick={() => {
              if (localLink) {
                window.open(localLink, '_blank');
              } else {
                const newLink = prompt('Enter job posting URL:', localLink);
                if (newLink !== null) {
                  setLocalLink(newLink);
                  onLinkChange?.(newLink);
                }
              }
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              const newLink = prompt('Edit job posting URL:', localLink);
              if (newLink !== null) {
                setLocalLink(newLink);
                onLinkChange?.(newLink);
              }
            }}
            style={{
              background: currentTheme.secondary,
              color: getTextColor(currentTheme.primary),
              border: `2px solid ${currentTheme.outline}`,
              borderRadius: '12px',
              padding: '8px 16px',
              fontSize: '0.875rem',
              fontFamily: currentTheme.font,
              cursor: 'pointer',
              outline: 'none',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: `0 4px 12px ${currentTheme.outline}30`,
              transition: 'all 0.2s ease',
              minWidth: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${currentTheme.outline}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${currentTheme.outline}30`;
            }}
          >
            Link🔗
          </button>

          {/* Interest Level - Middle (Dropdown 5 to 1) */}
          <select
            value={localInterest}
            onChange={(e) => {
              const newInterest = parseInt(e.target.value);
              setLocalInterest(newInterest);
              onInterestChange?.(newInterest);
            }}
            style={{
              background: currentTheme.secondary,
              color: getTextColor(currentTheme.primary),
              border: `2px solid ${currentTheme.outline}`,
              borderRadius: '12px',
              padding: '8px 16px',
                fontSize: '0.9625rem',
              fontWeight: '700',
              fontFamily: currentTheme.font,
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              width: '60px',
              textAlign: 'center',
              boxShadow: `0 4px 12px ${currentTheme.outline}30`,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${currentTheme.outline}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${currentTheme.outline}30`;
            }}
            onFocus={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = `0 6px 20px ${currentTheme.outline}50`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${currentTheme.outline}30`;
            }}
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>

          {/* Status - Right Side */}
          <select
            value={localStatus}
            onChange={e => {
              setLocalStatus(e.target.value);
              // Only allow valid status values
              const validStatuses = ['not-applied', 'applied', 'accepted', 'rejected'] as const;
              const value = e.target.value as typeof validStatuses[number];
              if (validStatuses.includes(value)) {
                onStatusChange?.(value);
              }
            }}
            style={{
              background: currentTheme.secondary,
              color: getTextColor(currentTheme.primary),
              border: `2px solid ${currentTheme.outline}`,
              borderRadius: '12px',
              padding: '8px 16px',
              fontSize: '0.875rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: currentTheme.font,
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              minWidth: '120px',
              textAlign: 'center',
              boxShadow: `0 4px 12px ${currentTheme.outline}30`,
              transition: 'all 0.2s ease'
            }}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Considering">Considering</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;