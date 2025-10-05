
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export interface FilterBarProps {
  filter: {
    title: string;
    company: string;
    term: string;
    location: string;
    type: string;
    interest: string;
    status: string;
  };
  setFilter: (f: Partial<FilterBarProps['filter']>) => void;

}

const jobTypes = [
  'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance', 'Remote', 'Hybrid'
];
const termOptions = [
  'Fall', 'Winter', 'Summer'
];
const statusOptions = [
  'Applied', 'Not Applied', 'Accepted', 'Rejected'
];

const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter }) => {
  const { currentTheme } = useTheme();
  const [activeSort, setActiveSort] = useState<'title' | 'company' | 'location' | null>(null);

  const handleSortClick = (key: 'title' | 'company' | 'location') => {
    if (activeSort === key) {
      setActiveSort(null);
      if (key === 'title') setFilter({ title: '', company: '', location: '' });
      if (key === 'company') setFilter({ company: '', title: '', location: '' });
      if (key === 'location') setFilter({ location: '', title: '', company: '' });
    } else {
      setActiveSort(key);
      if (key === 'title') setFilter({ title: 'sort', company: '', location: '' });
      if (key === 'company') setFilter({ company: 'sort', title: '', location: '' });
      if (key === 'location') setFilter({ location: 'sort', title: '', company: '' });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{
        color: currentTheme.outline,
        fontFamily: currentTheme.font,
        fontWeight: 600,
  fontSize: '0.9375rem',
        marginRight: '0.7rem'
      }}>Filter:</span>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: currentTheme.secondary,
          borderRadius: '3.6px',
          padding: '0.225rem 0.45rem',
          boxShadow: `0 1.8px 7.2px ${currentTheme.outline}20`,
          border: `1.8px solid ${currentTheme.outline}`,
          fontFamily: currentTheme.font,
          color: currentTheme.outline,
          fontSize: '0.648rem'
        }}
      >
      {/* Title sort button */}
      <button
        type="button"
        onClick={() => handleSortClick('title')}
        style={{
          minWidth: 65,
          width: 80,
          padding: '0.216rem',
          borderRadius: 4.32,
          border: activeSort === 'title' ? `2px solid ${currentTheme.outline}` : 'none',
          fontSize: '0.648rem',
          fontFamily: currentTheme.font,
          color: currentTheme.outline,
          background: currentTheme.primary,
          marginTop: '5px',
          marginBottom: '5px',
          marginLeft: '0.18rem',
          marginRight: '0.18rem',
          cursor: 'pointer',
          fontWeight: 400
        }}
      >
        Title (A-Z)
      </button>
      {/* Company sort button */}
      <button
        type="button"
        onClick={() => handleSortClick('company')}
        style={{
          minWidth: 80,
          width: 95,
          padding: '0.216rem',
          borderRadius: 4.32,
          border: activeSort === 'company' ? `2px solid ${currentTheme.outline}` : 'none',
          fontSize: '0.648rem',
          fontFamily: currentTheme.font,
          color: currentTheme.outline,
          background: currentTheme.primary,
          marginTop: '5px',
          marginBottom: '5px',
          marginLeft: '0.18rem',
          marginRight: '0.18rem',
          cursor: 'pointer',
          fontWeight: 400
        }}
      >
        Company (A-Z)
      </button>
      {/* Location sort button */}
      <button
        type="button"
        onClick={() => handleSortClick('location')}
        style={{
          minWidth: 80,
          width: 95,
          padding: '0.216rem',
          borderRadius: 4.32,
          border: activeSort === 'location' ? `2px solid ${currentTheme.outline}` : 'none',
          fontSize: '0.648rem',
          fontFamily: currentTheme.font,
          color: currentTheme.outline,
          background: currentTheme.primary,
          marginTop: '5px',
          marginBottom: '5px',
          marginLeft: '0.18rem',
          marginRight: '0.18rem',
          cursor: 'pointer',
          fontWeight: 400
        }}
      >
        Location (A-Z)
      </button>
      {/* Term dropdown */}
      <select
        value={filter.term}
        onChange={e => setFilter({ term: e.target.value })}
        style={{
          minWidth: 58,
          padding: '0.216rem',
          borderRadius: 4.32,
          border: filter.term ? `2px solid ${currentTheme.outline}` : 'none',
          fontSize: '0.648rem',
          fontFamily: currentTheme.font,
          color: currentTheme.outline,
          background: currentTheme.primary,
          marginTop: '5px',
          marginBottom: '5px'
        }}
      >
        <option value="" style={{ color: 'black', background: currentTheme.primary }}>Term</option>
        {termOptions.map(term => (
          <option
            key={term}
            value={term.toLowerCase()}
            style={{
              color: filter.term === term.toLowerCase() ? currentTheme.secondary : 'black'
            }}
          >
            {term}
          </option>
        ))}
      </select>
      {/* Type dropdown */}
      <select
        value={filter.type}
        onChange={e => setFilter({ type: e.target.value })}
        style={{
          minWidth: 58,
          padding: '0.216rem',
          borderRadius: 4.32,
          border: filter.type ? `2px solid ${currentTheme.outline}` : 'none',
          fontSize: '0.648rem',
          fontFamily: currentTheme.font,
          color: currentTheme.outline,
          background: currentTheme.primary,
          marginTop: '5px',
          marginBottom: '5px'
        }}
      >
        <option value="" style={{ color: 'black', background: currentTheme.primary }}>Type</option>
        {jobTypes.map(type => (
          <option
            key={type}
            value={type.toLowerCase()}
            style={{
              color: filter.type === type.toLowerCase() ? currentTheme.secondary : 'black'
            }}
          >
            {type}
          </option>
        ))}
      </select>
      {/* Interest dropdown */}
      <select
        value={filter.interest}
        onChange={e => setFilter({ interest: e.target.value })}
        style={{
          minWidth: 43,
          padding: '0.216rem',
          borderRadius: 4.32,
          border: filter.interest ? `2px solid ${currentTheme.outline}` : 'none',
          fontSize: '0.648rem',
          fontFamily: currentTheme.font,
          color: currentTheme.outline,
          background: currentTheme.primary,
          marginTop: '5px',
          marginBottom: '5px'
        }}
      >
        <option value="" style={{ color: 'black', background: currentTheme.primary }}>Interest</option>
        {[5,4,3,2,1].map(i => (
          <option
            key={i}
            value={String(i)}
            style={{
              color: filter.interest === String(i) ? currentTheme.secondary : 'black'
            }}
          >
            {i}
          </option>
        ))}
      </select>
      {/* Status dropdown */}
      <select
        value={filter.status}
        onChange={e => setFilter({ status: e.target.value })}
        style={{
          minWidth: 58,
          padding: '0.216rem',
          borderRadius: 4.32,
          border: filter.status ? `2px solid ${currentTheme.outline}` : 'none',
          fontSize: '0.648rem',
          fontFamily: currentTheme.font,
          color: currentTheme.outline,
          background: currentTheme.primary,
          marginTop: '5px',
          marginBottom: '5px'
        }}
      >
        <option value="" style={{ color: 'black', background: currentTheme.primary }}>Status</option>
        {statusOptions.map(status => (
          <option
            key={status}
            value={status.toLowerCase()}
            style={{
              color: filter.status === status.toLowerCase() ? currentTheme.secondary : 'black'
            }}
          >
            {status}
          </option>
        ))}
      </select>
      </div>
    </div>
  );

};

export default FilterBar;
