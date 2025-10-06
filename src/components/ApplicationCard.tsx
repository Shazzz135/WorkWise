import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import { useApplications } from '../contexts/ApplicationContext';

export interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  jobType: string;
  location: string;
  term?: string;
  length?: string;
  interestLevel: number;
  details?: string;
  link: string;
  status?: string;
}

interface ApplicationCardProps {
  application: JobApplication;
  onRemove?: (id: string) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onRemove }) => {
  const { currentTheme } = useTheme();
  const { updateApplication } = useApplications();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<JobApplication>(application);
  
  const handleClick = () => {
    if (application.link) {
      window.open(application.link, '_blank');
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(application.id);
    }
  };

  const handleToggleEdit = (e?: React.MouseEvent) => {
    e && e.stopPropagation();
    setIsEditing(v => {
      if (!v) {
        setDraft(application);
      }
      return !v;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Remove id from draft when passing updates
    const { id, ...updates } = draft;
    updateApplication(application.id, updates as Partial<JobApplication>);
    setIsEditing(false);
  };

  const handleChange = (key: keyof JobApplication, value: any) => {
    setDraft(prev => ({ ...prev, [key]: value }));
  };

  const getInterestColor = (level: number) => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#059669'];
    return colors[level - 1] || colors[0];
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'applied': return '#3b82f6';
      case 'interview': return '#8b5cf6';
      case 'offer': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return currentTheme.secondary;
    }
  };
  return (
    <div 
      className="application-card" 
      onClick={handleClick}
      style={{
        background: currentTheme.primary,
        borderLeft: `6px solid ${currentTheme.outline}`,
        fontFamily: currentTheme.font,
        boxShadow: `0 4px 12px ${currentTheme.outline}20`,
      }}
    >
      <div className="application-card-header">
        <div className="company-info">
          <div 
            className="company-icon"
            style={{ color: currentTheme.secondary }}
          >
            🏢
          </div>
          <div className="interest-level" style={{ backgroundColor: getInterestColor(application.interestLevel) }}>
            {application.interestLevel}
          </div>
        </div>
        {onRemove && (
          <button 
            className="remove-button" 
            onClick={handleRemove}
            aria-label="Remove application"
            style={{ 
              color: currentTheme.secondary,
              backgroundColor: `${currentTheme.secondary}20`,
              border: `1px solid ${currentTheme.secondary}40`
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6l12 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <button
          className="edit-button"
          onClick={handleToggleEdit}
          aria-label="Edit application"
          style={{
            marginLeft: '8px',
            color: currentTheme.secondary,
            backgroundColor: `${currentTheme.secondary}20`,
            border: `1px solid ${currentTheme.secondary}40`
          }}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      <div className="application-card-content">
        {isEditing ? (
          <form onSubmit={handleSave} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'grid', gap: '6px' }}>
              <input value={draft.companyName} onChange={e => handleChange('companyName', e.target.value)} />
              <input value={draft.jobTitle} onChange={e => handleChange('jobTitle', e.target.value)} />
              <input value={draft.jobType} onChange={e => handleChange('jobType', e.target.value)} />
              <input value={draft.location} onChange={e => handleChange('location', e.target.value)} />
              <input value={draft.term || ''} onChange={e => handleChange('term', e.target.value)} />
              <input value={draft.length || ''} onChange={e => handleChange('length', e.target.value)} />
              <input type="number" min={1} max={5} value={draft.interestLevel} onChange={e => handleChange('interestLevel', Number(e.target.value))} />
              <input value={draft.details || ''} onChange={e => handleChange('details', e.target.value)} />
              <input value={draft.link} onChange={e => handleChange('link', e.target.value)} />
              <input value={draft.status || ''} onChange={e => handleChange('status', e.target.value)} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" style={{ background: currentTheme.secondary, color: 'white' }}>Save</button>
                <button type="button" onClick={handleToggleEdit}>Cancel</button>
              </div>
            </div>
          </form>
        ) : (
          <>
        <h3 
          className="application-name" 
          style={{ 
            color: 'white',
            fontFamily: currentTheme.font
          }}
        >
          {application.jobTitle && application.jobTitle.trim() ? application.jobTitle : '-----'}
        </h3>
        <p 
          className="company-name"
          style={{ 
            color: currentTheme.secondary,
            fontFamily: currentTheme.font,
            fontWeight: '600'
          }}
        >
          {application.companyName && application.companyName.trim() ? application.companyName : '-----'}
        </p>
        <div className="job-details">
          <span 
            className="location"
            style={{ 
              color: `${currentTheme.secondary}E6`,
              fontFamily: currentTheme.font
            }}
          >
            📍 {application.location && application.location.trim() ? application.location : '-----'}
          </span>
          <span 
            className="job-type"
            style={{ 
              color: `${currentTheme.secondary}E6`,
              fontFamily: currentTheme.font,
              backgroundColor: `${currentTheme.outline}30`,
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}
          >
            💼 {application.jobType && application.jobType.trim() ? application.jobType : '-----'}
          </span>
        </div>
        <div 
          className="status-badge" 
          style={{ 
            backgroundColor: getStatusColor(application.status),
            color: 'white',
            fontFamily: currentTheme.font,
            border: `1px solid ${currentTheme.outline}`
          }}
        >
          {application.status && application.status.trim() ? application.status : '-----'}
        </div>
        {/* Optionally render term, length, details if present */}
        <div style={{ color: currentTheme.secondary, fontSize: '0.75rem', marginTop: '4px' }}>
          <strong>Term:</strong> {application.term && application.term.trim() ? application.term : '-----'}
        </div>
        <div style={{ color: currentTheme.secondary, fontSize: '0.75rem' }}>
          <strong>Length:</strong> {application.length && application.length.trim() ? application.length : '-----'}
        </div>
        <div style={{ color: currentTheme.secondary, fontSize: '0.75rem', marginTop: '4px' }}>
          <strong>Details:</strong> {application.details && application.details.trim() ? application.details : '-----'}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;