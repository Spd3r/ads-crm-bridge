
import React from 'react';
import { Settings, Users, BarChart3, Database, Key, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isIntegrationActive: boolean;
}

export const Sidebar = ({ activeSection, setActiveSection, isIntegrationActive }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'credentials', label: 'Credenciais', icon: Key },
    { id: 'campaigns', label: 'Campanhas', icon: Users, disabled: !isIntegrationActive },
    { id: 'data-sync', label: 'Sincronização', icon: Database, disabled: !isIntegrationActive },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Google Ads</h1>
            <p className="text-sm text-gray-500">Integração CRM</p>
          </div>
        </div>
        <div className="mt-4">
          <div className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm",
            isIntegrationActive 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          )}>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isIntegrationActive ? "bg-green-500" : "bg-red-500"
            )} />
            <span>{isIntegrationActive ? 'Integração Ativa' : 'Integração Inativa'}</span>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => !item.disabled && setActiveSection(item.id)}
              disabled={item.disabled}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                activeSection === item.id
                  ? "bg-blue-100 text-blue-700"
                  : item.disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
