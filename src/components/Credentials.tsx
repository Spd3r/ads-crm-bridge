
import React, { useState } from 'react';
import { Eye, EyeOff, Key, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface CredentialsProps {
  credentials: any;
  setCredentials: (creds: any) => void;
  isIntegrationActive: boolean;
  setIsIntegrationActive: (active: boolean) => void;
}

export const Credentials = ({ 
  credentials, 
  setCredentials, 
  isIntegrationActive, 
  setIsIntegrationActive 
}: CredentialsProps) => {
  const [formData, setFormData] = useState({
    clientId: credentials?.clientId || '',
    clientSecret: credentials?.clientSecret || '',
    developerToken: credentials?.developerToken || '',
    customerId: credentials?.customerId || '',
  });
  const [showSecrets, setShowSecrets] = useState({
    clientSecret: false,
    developerToken: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!formData.clientId || !formData.clientSecret || !formData.developerToken || !formData.customerId) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular validação das credenciais
    setTimeout(() => {
      setCredentials(formData);
      setIsIntegrationActive(true);
      setIsLoading(false);
      
      toast({
        title: "Sucesso",
        description: "Credenciais salvas e integração ativada!",
      });
    }, 2000);
  };

  const handleTest = async () => {
    if (!credentials) {
      toast({
        title: "Erro",
        description: "Salve as credenciais primeiro",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular teste de conexão
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Conexão Testada",
        description: "Credenciais válidas e conexão estabelecida!",
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Credenciais Google Ads</h1>
        <p className="text-gray-600 mt-2">Configure suas credenciais para conectar com o Google Ads API</p>
      </div>

      {isIntegrationActive && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="text-sm font-medium text-green-800">Integração Ativa</h3>
              <p className="text-sm text-green-700 mt-1">
                Suas credenciais estão configuradas e a integração está funcionando.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Como obter as credenciais</h3>
                <div className="text-sm text-blue-700 mt-1 space-y-1">
                  <p>1. Acesse o <a href="https://console.developers.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></p>
                  <p>2. Crie um projeto e ative a Google Ads API</p>
                  <p>3. Configure OAuth 2.0 e obtenha Client ID e Secret</p>
                  <p>4. Obtenha o Developer Token no Google Ads</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID *</Label>
              <Input
                id="clientId"
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                placeholder="Digite o Client ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientSecret">Client Secret *</Label>
              <div className="relative">
                <Input
                  id="clientSecret"
                  type={showSecrets.clientSecret ? 'text' : 'password'}
                  value={formData.clientSecret}
                  onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
                  placeholder="Digite o Client Secret"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowSecrets({ ...showSecrets, clientSecret: !showSecrets.clientSecret })}
                >
                  {showSecrets.clientSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="developerToken">Developer Token *</Label>
              <div className="relative">
                <Input
                  id="developerToken"
                  type={showSecrets.developerToken ? 'text' : 'password'}
                  value={formData.developerToken}
                  onChange={(e) => setFormData({ ...formData, developerToken: e.target.value })}
                  placeholder="Digite o Developer Token"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowSecrets({ ...showSecrets, developerToken: !showSecrets.developerToken })}
                >
                  {showSecrets.developerToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerId">Customer ID *</Label>
              <Input
                id="customerId"
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                placeholder="123-456-7890"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleSave} disabled={isLoading} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>{isLoading ? 'Salvando...' : 'Salvar Credenciais'}</span>
            </Button>
            
            {credentials && (
              <Button variant="outline" onClick={handleTest} disabled={isLoading}>
                <Key className="h-4 w-4 mr-2" />
                Testar Conexão
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
