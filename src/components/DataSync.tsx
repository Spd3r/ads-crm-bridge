
import React, { useState } from 'react';
import { Database, Upload, Download, RefreshCw, Users, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataSyncProps {
  isIntegrationActive: boolean;
}

export const DataSync = ({ isIntegrationActive }: DataSyncProps) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncData = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 3000);
  };

  const syncStats = [
    {
      title: 'Leads Enviados Hoje',
      value: isIntegrationActive ? '47' : '0',
      icon: Upload,
      color: 'blue'
    },
    {
      title: 'Dados Recebidos',
      value: isIntegrationActive ? '132' : '0',
      icon: Download,
      color: 'green'
    },
    {
      title: 'Total Sincronizado',
      value: isIntegrationActive ? '1.2k' : '0',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Erros de Sync',
      value: isIntegrationActive ? '2' : '0',
      icon: AlertCircle,
      color: 'red'
    },
  ];

  const recentSyncActivity = isIntegrationActive ? [
    {
      id: 1,
      type: 'upload',
      description: '25 leads enviados para Google Ads',
      status: 'success',
      timestamp: 'Há 15 min'
    },
    {
      id: 2,
      type: 'download',
      description: 'Dados de conversão sincronizados',
      status: 'success',
      timestamp: 'Há 1 hora'
    },
    {
      id: 3,
      type: 'upload',
      description: '18 leads enviados para Google Ads',
      status: 'success',
      timestamp: 'Há 2 horas'
    },
    {
      id: 4,
      type: 'error',
      description: 'Falha na sincronização de 3 leads',
      status: 'error',
      timestamp: 'Há 3 horas'
    },
  ] : [];

  if (!isIntegrationActive) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sincronização de Dados</h1>
          <p className="text-gray-600 mt-2">Gerencie a sincronização entre CRM e Google Ads</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <Database className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Integração Inativa</h3>
          <p className="text-yellow-700">
            Ative a integração nas configurações de credenciais para começar a sincronizar dados.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sincronização de Dados</h1>
        <p className="text-gray-600 mt-2">Gerencie a sincronização entre CRM e Google Ads</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <h3 className="text-sm font-medium text-green-800">Sincronização Automática Ativa</h3>
            <p className="text-sm text-green-700">Última sincronização: há 15 minutos</p>
          </div>
        </div>
        <Button 
          onClick={handleSyncData} 
          disabled={isSyncing}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Agora'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {syncStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600',
            red: 'bg-red-100 text-red-600',
          };

          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações de Sincronização</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sincronização Automática</span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Ativada
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Intervalo</span>
              <span className="text-sm text-gray-900">A cada 15 minutos</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Horário de Funcionamento</span>
              <span className="text-sm text-gray-900">24/7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Retry em Falhas</span>
              <span className="text-sm text-gray-900">3 tentativas</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            {recentSyncActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-1 rounded-full ${
                  activity.status === 'success' 
                    ? 'bg-green-100' 
                    : activity.status === 'error' 
                    ? 'bg-red-100' 
                    : 'bg-yellow-100'
                }`}>
                  {activity.type === 'upload' && <Upload className="h-3 w-3 text-blue-600" />}
                  {activity.type === 'download' && <Download className="h-3 w-3 text-green-600" />}
                  {activity.type === 'error' && <AlertCircle className="h-3 w-3 text-red-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Logs de Sincronização</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-900">Sincronização automática executada</span>
            </div>
            <span className="text-xs text-gray-500">2024-01-15 14:30:00</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Upload className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-900">25 leads enviados com sucesso</span>
            </div>
            <span className="text-xs text-gray-500">2024-01-15 14:30:15</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Download className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-900">Dados de conversão recebidos</span>
            </div>
            <span className="text-xs text-gray-500">2024-01-15 14:31:02</span>
          </div>
        </div>
      </div>
    </div>
  );
};
