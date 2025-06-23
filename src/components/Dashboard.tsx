
import React from 'react';
import { BarChart3, Users, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface DashboardProps {
  isIntegrationActive: boolean;
}

export const Dashboard = ({ isIntegrationActive }: DashboardProps) => {
  const stats = [
    { 
      title: 'Campanhas Ativas', 
      value: isIntegrationActive ? '12' : '0', 
      icon: Target, 
      color: 'blue' 
    },
    { 
      title: 'Leads Sincronizados', 
      value: isIntegrationActive ? '1.2k' : '0', 
      icon: Users, 
      color: 'green' 
    },
    { 
      title: 'Taxa de Conversão', 
      value: isIntegrationActive ? '3.2%' : '0%', 
      icon: TrendingUp, 
      color: 'purple' 
    },
    { 
      title: 'Orçamento Mensal', 
      value: isIntegrationActive ? 'R$ 5.500' : 'R$ 0', 
      icon: BarChart3, 
      color: 'orange' 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral da integração Google Ads</p>
      </div>

      {!isIntegrationActive && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Integração Inativa</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Configure suas credenciais do Google Ads para ativar a integração.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600',
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {isIntegrationActive ? (
              <>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">25 leads sincronizados</p>
                    <p className="text-xs text-gray-500">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Campanha "Verão 2024" criada</p>
                    <p className="text-xs text-gray-500">Há 4 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Orçamento atualizado</p>
                    <p className="text-xs text-gray-500">Ontem</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma atividade recente</p>
                <p className="text-sm text-gray-400">Ative a integração para ver dados</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status da Integração</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Google Ads API</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                isIntegrationActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isIntegrationActive ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sincronização</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                isIntegrationActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {isIntegrationActive ? 'Automática' : 'Pausada'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Última Sincronização</span>
              <span className="text-sm text-gray-500">
                {isIntegrationActive ? 'Há 15 min' : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
