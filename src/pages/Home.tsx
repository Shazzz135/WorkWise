import React from 'react';
import TemplateCard from '../components/TemplateCard';
import { useApplications } from '../contexts/ApplicationContext';

const Home: React.FC = () => {
  const { applications, removeApplication, updateApplicationStatus, updateApplicationInterest } = useApplications();
  return (
    <div className="home-container" style={{ paddingTop: '10px' }}>
      <div className="applications-grid" style={{ paddingTop: '0' }}>
        {applications.map((app) => (
          <TemplateCard
            key={app.id}
            title={app.jobTitle}
            subtitle={app.companyName}
            jobType={app.jobType}
            term={app.term}
            length={app.length}
            location={app.location}
            details={app.details}
            showRemoveButton={true}
            status={app.status}
            interest={app.interestLevel}
            link={app.link}
            onClick={() => window.open(app.link, '_blank')}
            onRemove={() => removeApplication(app.id)}
            onStatusChange={(newStatus) => updateApplicationStatus(app.id, newStatus)}
            onInterestChange={(newInterest) => updateApplicationInterest(app.id, newInterest)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;