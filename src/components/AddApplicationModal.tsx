
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { JobApplication } from './ApplicationCard';

interface AddApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (application: Omit<JobApplication, 'id'>) => void;
}

const jobTypes = [
  'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance', 'Remote', 'Hybrid'
];
const statusOptions = [
  { value: 'not-applied', label: 'Not Applied' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'considering', label: 'Considering' },
  { value: 'pending', label: 'Pending' }
];

const AddApplicationModal: React.FC<AddApplicationModalProps> = ({ isOpen, onClose, onAdd }) => {
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobType: '',
    location: '',
    term: '',
    length: '',
    interestLevel: 3,
    details: '',
    link: '',
    status: ''
  });
  const lengthPattern = /^\d+$|^\d+\s*-\s*\d+$/;

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Make interestLevel and status mandatory
    if (!formData.interestLevel || !formData.status) {
      alert('Please fill out all required fields, including Interest Level and Status.');
      return;
    }
    // Validate length field
    console.log('Length field value:', formData.length);
    if (formData.length && !lengthPattern.test(formData.length.trim())) {
      alert('Length must be a whole number (e.g. 4) or a range (e.g. 12-16).');
      return;
    }
    onAdd({
      companyName: formData.companyName.trim() ? formData.companyName.trim() : '-----',
      jobTitle: formData.jobTitle.trim() ? formData.jobTitle.trim() : '-----',
      jobType: formData.jobType && formData.jobType.trim() ? formData.jobType : '-----',
      location: formData.location.trim() ? formData.location.trim() : '-----',
      term: formData.term && formData.term.trim() ? formData.term : '-----',
  length: formData.length && formData.length.trim() ? `${formData.length.trim()} months` : '-----',
      interestLevel: formData.interestLevel,
      details: formData.details && formData.details.trim() ? formData.details : '-----',
      link: formData.link.trim() ? formData.link.trim() : '-----',
      // store normalized status value that's compatible with TemplateCard
      status: formData.status && formData.status.trim() ? formData.status : 'not-applied'
    });
    setFormData({
      companyName: '',
      jobTitle: '',
      jobType: '',
      location: '',
      term: '',
      length: '',
      interestLevel: 3,
      details: '',
      link: '',
      status: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: `${currentTheme.secondary}CC`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        fontFamily: currentTheme.font
      }}
    >
      <div
        style={{
          minWidth: 300,
          maxWidth: 420,
          width: '100%',
          background: currentTheme.primary,
          border: `1.6px solid ${currentTheme.outline}`,
          borderRadius: 9.6,
          boxShadow: `0 1.6px 12.8px ${currentTheme.outline}30`,
          padding: '0.864rem 1.08rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.504rem',
          fontFamily: currentTheme.font,
          color: currentTheme.outline,
          position: 'relative',
          fontSize: '0.72rem',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginBottom: '0.4rem',
        }}>
          <span style={{
            fontSize: '0.96rem',
            fontWeight: 600,
            color: currentTheme.secondary,
            fontFamily: currentTheme.font,
            flex: 1,
            textAlign: 'center',
          }}>
            New Job Info
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: currentTheme.outline,
              fontSize: '1.04rem',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            &#10005;
          </button>
        </div>
  <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
          {/* Row 1: Title / Company */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            <label style={{ color: currentTheme.outline, fontFamily: currentTheme.font, fontSize: '0.72rem' }}>Job Title *</label>
            <input type="text" value={formData.jobTitle} onChange={e => handleInputChange('jobTitle', e.target.value)} required style={{ background: currentTheme.secondary, color: currentTheme.outline, border: `1.08px solid ${currentTheme.outline}`, borderRadius: 4.8, padding: '0.36rem', fontFamily: currentTheme.font, fontSize: '0.72rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            <label style={{ color: currentTheme.outline, fontFamily: currentTheme.font, fontSize: '0.72rem' }}>Company *</label>
            <input type="text" value={formData.companyName} onChange={e => handleInputChange('companyName', e.target.value)} required style={{ background: currentTheme.secondary, color: currentTheme.outline, border: `1.08px solid ${currentTheme.outline}`, borderRadius: 4.8, padding: '0.36rem', fontFamily: currentTheme.font, fontSize: '0.72rem' }} />
          </div>
          {/* Row 2: Type / Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            <label style={{ color: currentTheme.outline, fontFamily: currentTheme.font, fontSize: '0.72rem' }}>Job Type *</label>
            <select value={formData.jobType} onChange={e => handleInputChange('jobType', e.target.value)} required style={{ background: currentTheme.secondary, color: currentTheme.outline, border: `1.08px solid ${currentTheme.outline}`, borderRadius: 4.8, padding: '0.36rem', fontFamily: currentTheme.font, fontSize: '0.72rem' }}>
              <option value="" style={{ color: 'black', background: currentTheme.secondary }}>Select Job Type</option>
              {jobTypes.map(type => (
                <option key={type} value={type} style={{ color: 'black', background: currentTheme.secondary }}>{type}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            <label style={{ color: currentTheme.outline, fontFamily: currentTheme.font, fontSize: '0.72rem' }}>Location *</label>
            <input type="text" value={formData.location} onChange={e => handleInputChange('location', e.target.value)} required style={{ background: currentTheme.secondary, color: currentTheme.outline, border: `1.08px solid ${currentTheme.outline}`, borderRadius: 4.8, padding: '0.36rem', fontFamily: currentTheme.font, fontSize: '0.72rem' }} />
          </div>
          {/* Row 3: Term / Length */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            <label style={{ color: currentTheme.outline, fontFamily: currentTheme.font, fontSize: '0.72rem' }}>Term</label>
            <select
              value={formData.term}
              onChange={e => handleInputChange('term', e.target.value)}
              style={{
                background: currentTheme.secondary,
                color: currentTheme.outline,
                border: `1.08px solid ${currentTheme.outline}`,
                borderRadius: 4.8,
                padding: '0.36rem',
                fontFamily: currentTheme.font,
                fontSize: '0.72rem'
              }}
            >
              <option value="" style={{ color: 'black', background: currentTheme.secondary }}>Select Term</option>
              <option value="Fall" style={{ color: 'black', background: currentTheme.secondary }}>Fall</option>
              <option value="Winter" style={{ color: 'black', background: currentTheme.secondary }}>Winter</option>
              <option value="Summer" style={{ color: 'black', background: currentTheme.secondary }}>Summer</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            <label style={{ color: currentTheme.outline, fontFamily: currentTheme.font, fontSize: '0.72rem' }}>Length (e.g. 4 or 12-16)</label>
            <input
              type="text"
              value={formData.length}
              onChange={e => handleInputChange('length', e.target.value)}
              title="Enter a whole number (e.g. 4) or a range (e.g. 12-16)"
              style={{ background: currentTheme.secondary, color: currentTheme.outline, border: `1.08px solid ${currentTheme.outline}`, borderRadius: 4.8, padding: '0.36rem', fontFamily: currentTheme.font, fontSize: '0.72rem' }}
            />
          </div>
          {/* Row 4: Link (full row) */}
          <div style={{ gridColumn: '1 / span 2', display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            <label style={{ color: currentTheme.outline, fontFamily: currentTheme.font, fontSize: '0.72rem' }}>Link *</label>
            <input type="url" value={formData.link} onChange={e => handleInputChange('link', e.target.value)} required style={{ background: currentTheme.secondary, color: currentTheme.outline, border: `1.08px solid ${currentTheme.outline}`, borderRadius: 4.8, padding: '0.36rem', fontFamily: currentTheme.font, fontSize: '0.72rem' }} />
          </div>
          {/* Row 5: Details (full row) */}
          <div style={{ gridColumn: '1 / span 2', display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ color: currentTheme.outline, fontFamily: currentTheme.font, fontSize: '0.72rem' }}>Details</label>
              <span style={{ color: currentTheme.outline, fontSize: '0.6rem', fontFamily: currentTheme.font }}>
                {formData.details.length} / 200
              </span>
            </div>
            <textarea maxLength={200} value={formData.details} onChange={e => handleInputChange('details', e.target.value)} rows={2} style={{ background: currentTheme.secondary, color: currentTheme.outline, border: `1.08px solid ${currentTheme.outline}`, borderRadius: 4.8, padding: '0.36rem 0.36rem', fontFamily: currentTheme.font, fontSize: '0.576rem', width: 'auto', minWidth: '112px', maxWidth: '100%', height: '2.88rem', resize: 'none' }} />
          </div>
          {/* Row 6: Interest / Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            <label style={{ color: currentTheme.outline, fontFamily: currentTheme.font, fontSize: '0.72rem' }}>Interest Level *</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.504rem' }}>
              <div style={{ width: '100%' }}>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={formData.interestLevel}
                  onChange={e => handleInputChange('interestLevel', parseInt(e.target.value))}
                  required
                  style={{
                    accentColor: currentTheme.outline,
                    background: currentTheme.secondary,
                    borderRadius: 4.8,
                    width: '100%',
                    height: 14.4,
                    margin: '4.8px auto 0 auto',
                    display: 'block'
                  }}
                />
                {/* Numbers directly under the interest bar */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '2px', padding: '0 2px' }}>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} style={{ fontSize: '0.7rem', color: currentTheme.outline, fontFamily: currentTheme.font }}>{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.36rem' }}>
            <label style={{ color: currentTheme.outline, fontFamily: currentTheme.font, fontSize: '0.72rem' }}>Status *</label>
            <select value={formData.status} onChange={e => handleInputChange('status', e.target.value)} required style={{ background: currentTheme.secondary, color: currentTheme.outline, border: `1.08px solid ${currentTheme.outline}`, borderRadius: 4.8, padding: '0.36rem', fontFamily: currentTheme.font, fontSize: '0.72rem' }}>
              <option value="" style={{ color: 'black', background: currentTheme.secondary }}>Select Status</option>
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value} style={{ color: 'black', background: currentTheme.secondary }}>{opt.label}</option>
              ))}
            </select>
          </div>
          {/* Buttons (full row) */}
          <div style={{ gridColumn: '1 / span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.504rem', marginTop: '0.36rem' }}>
            <button type="button" onClick={onClose} style={{ background: currentTheme.primary, color: currentTheme.outline, border: `1.08px solid ${currentTheme.outline}`, borderRadius: 4.8, padding: '0.36rem 0.864rem', fontFamily: currentTheme.font, fontWeight: 500, cursor: 'pointer', fontSize: '0.72rem' }}>Cancel</button>
            <button type="submit" style={{ background: currentTheme.secondary, color: currentTheme.primary, border: `1.08px solid ${currentTheme.outline}`, borderRadius: 4.8, padding: '0.36rem 0.864rem', fontFamily: currentTheme.font, fontWeight: 500, cursor: 'pointer', fontSize: '0.72rem' }}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplicationModal;