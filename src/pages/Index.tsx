
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { Credentials } from '@/components/Credentials';
import { Campaigns } from '@/components/Campaigns';
import { DataSync } from '@/components/DataSync';
import { Settings } from '@/components/Settings';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isIntegrationActive, setIsIntegrationActive] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard isIntegrationActive={isIntegrationActive} />;
      case 'credentials':
        return <Credentials 
          credentials={credentials} 
          setCredentials={setCredentials}
          isIntegrationActive={isIntegrationActive}
          setIsIntegrationActive={setIsIntegrationActive}
        />;
      case 'campaigns':
        return <Campaigns isIntegrationActive={isIntegrationActive} />;
      case 'data-sync':
        return <DataSync isIntegrationActive={isIntegrationActive} />;
      case 'settings':
        return <Settings 
          isIntegrationActive={isIntegrationActive}
          setIsIntegrationActive={setIsIntegrationActive}
        />;
      default:
        return <Dashboard isIntegrationActive={isIntegrationActive} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isIntegrationActive={isIntegrationActive}
      />
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
