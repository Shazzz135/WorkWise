import React, { createContext, useContext, useState, useEffect } from 'react';
import type { JobApplication } from '../components/ApplicationCard';

interface ApplicationContextType {
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, 'id'>) => void;
  removeApplication: (id: string) => void;
  updateApplicationStatus: (id: string, status: 'not-applied' | 'applied' | 'accepted' | 'rejected') => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // No default job applications (0 default cards)
  const defaultApplications: JobApplication[] = [];

  // Get initial applications from localStorage or fallback to default
  const getInitialApplications = (): JobApplication[] => {
    try {
      const savedApps = localStorage.getItem('workwise-job-applications');
      if (savedApps) {
        const parsed = JSON.parse(savedApps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('❌ Error reading saved applications:', e);
    }
    // Fallback to default applications
    return defaultApplications;
  };

  const [applications, setApplications] = useState<JobApplication[]>(getInitialApplications);

  // Save applications to localStorage whenever applications change
  useEffect(() => {
    localStorage.setItem('workwise-job-applications', JSON.stringify(applications));
  }, [applications]);

  // Save applications to localStorage and to sample-job-applications.txt whenever applications change
  useEffect(() => {
    localStorage.setItem('workwise-job-applications', JSON.stringify(applications));
    // Save to txt file in pipe-separated format
    const header = 'Company Name|Job Title|Job Type|Location|Term|Length|Interest Level|Details|Link|Status';
    const lines = applications.map(app => [
      app.companyName,
      app.jobTitle,
      app.jobType,
      app.location,
      app.term || '',
      app.length || '',
      app.interestLevel,
      app.details || '',
      app.link,
      app.status || ''
    ].join('|'));
    const txtContent = [header, ...lines].join('\n');
    try {
      // @ts-ignore
      window.saveJobApplicationsToTxt && window.saveJobApplicationsToTxt(txtContent);
    } catch (e) {
      // If not running in an environment that supports file writing, ignore
    }
  }, [applications]);

  const addApplication = (app: Omit<JobApplication, 'id'>) => {
    const newApp: JobApplication = {
      ...app,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setApplications(prev => [...prev, newApp]);
  };

  const removeApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const updateApplicationStatus = (id: string, status: 'not-applied' | 'applied' | 'accepted' | 'rejected') => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      addApplication,
      removeApplication,
      updateApplicationStatus
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};