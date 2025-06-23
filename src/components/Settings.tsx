
import React, { useState } from 'react';
import { Settings as SettingsIcon, Toggle, Bell, Clock, Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface SettingsProps {
  isIntegrationActive: boolean;
  setIsIntegrationActive: (active: boolean) => void;
}

export const Settings = ({ isIntegrationActive, setIsIntegrationActive }: SettingsProps) => {
  const [settings, setSettings] = useState({
    syncInterval: '15',
    notifications: true,
    autoRetry: true,
    maxRetries: '3',
    batchSize: '100',
    timeoutSeconds: '30',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleToggleIntegration = () => {
    setIsIntegrationActive(!isIntegrationActive);
    toast({
      title: isIntegrationActive ? "Integração Desativada" : "Integração Ativada",
      description: isIntegrationActive 
        ? "A sincronização foi pausada" 
        : "A sincronização foi retomada",
    });
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    // Simular salvamento das configurações
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações Salvas",
        description: "Suas configurações foram atualizadas com sucesso!",
      });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">Gerencie as configurações da integração</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Toggle className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Status da Integração</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Integração Google Ads</h4>
                <p className="text-sm text-gray-600">
                  {isIntegrationActive ? 'Ativa e sincronizando dados' : 'Pausada - não está sincronizando'}
                </p>
              </div>
              <Button 
                onClick={handleToggleIntegration}
                variant={isIntegrationActive ? "destructive" : "default"}
              >
                {isIntegrationActive ? 'Desativar' : 'Ativar'}
              </Button>
            </div>

            <div className={`p-4 rounded-lg border ${
              isIntegrationActive 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  isIntegrationActive ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className={`text-sm font-medium ${
                  isIntegrationActive ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isIntegrationActive ? 'Status: Ativo' : 'Status: Inativo'}
                </span>
              </div>
              <p className={`text-sm mt-1 ${
                isIntegrationActive ? 'text-green-700' : 'text-red-700'
              }`}>
                {isIntegrationActive 
                  ? 'A integração está funcionando normalmente'
                  : 'Ative a integração para retomar a sincronização'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Configurações de Sincronização</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="syncInterval">Intervalo de Sincronização (minutos)</Label>
              <Input
                id="syncInterval"
                type="number"
                value={settings.syncInterval}
                onChange={(e) => setSettings({ ...settings, syncInterval: e.target.value })}
                placeholder="15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchSize">Tamanho do Lote</Label>
              <Input
                id="batchSize"
                type="number"
                value={settings.batchSize}
                onChange={(e) => setSettings({ ...settings, batchSize: e.target.value })}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeoutSeconds">Timeout (segundos)</Label>
              <Input
                id="timeoutSeconds"
                type="number"
                value={settings.timeoutSeconds}
                onChange={(e) => setSettings({ ...settings, timeoutSeconds: e.target.value })}
                placeholder="30"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Bell className="h-5 w-5 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Notificações</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Notificações por Email</h4>
                <p className="text-sm text-gray-600">Receber alertas sobre sincronização</p>
              </div>
              <Button
                variant={settings.notifications ? "default" : "outline"}
                size="sm"
                onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
              >
                {settings.notifications ? 'Ativado' : 'Desativado'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Retry Automático</h4>
                <p className="text-sm text-gray-600">Tentar novamente em caso de falha</p>
              </div>
              <Button
                variant={settings.autoRetry ? "default" : "outline"}
                size="sm"
                onClick={() => setSettings({ ...settings, autoRetry: !settings.autoRetry })}
              >
                {settings.autoRetry ? 'Ativado' : 'Desativado'}
              </Button>
            </div>

            {settings.autoRetry && (
              <div className="space-y-2 ml-4">
                <Label htmlFor="maxRetries">Máximo de Tentativas</Label>
                <Input
                  id="maxRetries"
                  type="number"
                  value={settings.maxRetries}
                  onChange={(e) => setSettings({ ...settings, maxRetries: e.target.value })}
                  placeholder="3"
                  className="w-24"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Segurança</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Informações de Segurança</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Conexão criptografada com Google Ads API</li>
                <li>• Credenciais armazenadas de forma segura</li>
                <li>• Logs de auditoria disponíveis</li>
                <li>• Acesso restrito por IP (opcional)</li>
              </ul>
            </div>

            <Button variant="outline" className="w-full">
              Ver Logs de Auditoria
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings} 
          disabled={isLoading}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>{isLoading ? 'Salvando...' : 'Salvar Configurações'}</span>
        </Button>
      </div>
    </div>
  );
};
