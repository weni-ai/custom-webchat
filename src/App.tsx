import { useState } from 'react';
import { ChatWidget } from './components';
import type { WebChatConfig } from './types';
import { MessageCircle, Zap, Palette, Shield, Code, Type, Link2, Image } from 'lucide-react';

type ConfigTab = 'connection' | 'appearance' | 'texts';

function App() {
  const [activeTab, setActiveTab] = useState<ConfigTab>('appearance');
  
  // Configuração do chat
  const [config, setConfig] = useState<WebChatConfig>({
    // Configurações de conexão
    channelUuid: '81310c47-8520-40bf-a8a2-281bd495b7ba',
    socketUrl: 'https://websocket.weni.ai',
    host: 'https://flows.weni.ai',

    // Configurações de aparência
    title: 'WebChat Custom',
    subtitle: 'Desenvolvido com ❤️',
    avatarUrl: '',
    inputPlaceholder: 'Digite sua mensagem...',

    // Cores do tema
    primaryColor: '#6366f1',
    secondaryColor: '#818cf8',
    backgroundColor: '#0f0f23',
    textColor: '#e2e8f0',
    userMessageColor: '#6366f1',
    botMessageColor: '#1e1e3f',
    headerColor: '#6366f1',
    footerColor: '#1e1e3f',
    
    // Cores de texto
    textHeaderColor: '#ffffff',
    textInputColor: '#e2e8f0',
    textPlaceholderColor: '#94a3b8',
    textUserMessageColor: '#ffffff',
    textBotMessageColor: '#e2e8f0',

    // Callbacks
    onConnect: () => console.log('✅ Conectado ao WebChat'),
    onDisconnect: () => console.log('❌ Desconectado do WebChat'),
    onMessage: (msg) => console.log('📨 Nova mensagem:', msg),
    onError: (err) => console.error('⚠️ Erro:', err),
  });

  const updateConfig = (key: keyof WebChatConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const colorPresets = [
    { name: 'Indigo', primary: '#6366f1', secondary: '#818cf8', bg: '#0f0f23', botBubble: '#1e1e3f', header: '#6366f1', footer: '#1e1e3f' },
    { name: 'Emerald', primary: '#10b981', secondary: '#34d399', bg: '#0f1f1a', botBubble: '#1a2f2a', header: '#10b981', footer: '#1a2f2a' },
    { name: 'Rose', primary: '#f43f5e', secondary: '#fb7185', bg: '#1f0f14', botBubble: '#2f1a22', header: '#f43f5e', footer: '#2f1a22' },
    { name: 'Amber', primary: '#f59e0b', secondary: '#fbbf24', bg: '#1f1a0f', botBubble: '#2f2a1a', header: '#f59e0b', footer: '#2f2a1a' },
    { name: 'Cyan', primary: '#06b6d4', secondary: '#22d3ee', bg: '#0f1a1f', botBubble: '#1a2a2f', header: '#06b6d4', footer: '#1a2a2f' },
    { name: 'Purple', primary: '#a855f7', secondary: '#c084fc', bg: '#1a0f23', botBubble: '#2a1e3f', header: '#a855f7', footer: '#2a1e3f' },
  ];

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setConfig(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      backgroundColor: preset.bg,
      userMessageColor: preset.primary,
      botMessageColor: preset.botBubble,
      headerColor: preset.header,
      footerColor: preset.footer,
    }));
  };

  return (
    <div className="demo-page">
      {/* Painel de configuração */}
      <div className="config-panel">
        <h3>Personalização</h3>
        
        {/* Abas */}
        <div className="config-tabs">
          <button 
            className={`config-tab ${activeTab === 'connection' ? 'config-tab--active' : ''}`}
            onClick={() => setActiveTab('connection')}
          >
            <Link2 size={14} />
            <span>Conexão</span>
          </button>
          <button 
            className={`config-tab ${activeTab === 'appearance' ? 'config-tab--active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <Palette size={14} />
            <span>Aparência</span>
          </button>
          <button 
            className={`config-tab ${activeTab === 'texts' ? 'config-tab--active' : ''}`}
            onClick={() => setActiveTab('texts')}
          >
            <Type size={14} />
            <span>Textos</span>
          </button>
        </div>

        {/* Conteúdo das abas */}
        <div className="config-content">
          {/* Aba Conexão */}
          {activeTab === 'connection' && (
            <>
              <div className="config-field">
                <label>Channel UUID</label>
                <input
                  type="text"
                  value={config.channelUuid}
                  onChange={(e) => updateConfig('channelUuid', e.target.value)}
                  placeholder="Ex: abc123-def456-..."
                />
              </div>

              <div className="config-field">
                <label>Socket URL</label>
                <input
                  type="text"
                  value={config.socketUrl}
                  onChange={(e) => updateConfig('socketUrl', e.target.value)}
                  placeholder="Ex: https://websocket.weni.ai"
                />
              </div>

              <div className="config-field">
                <label>Host</label>
                <input
                  type="text"
                  value={config.host}
                  onChange={(e) => updateConfig('host', e.target.value)}
                  placeholder="Ex: https://flows.weni.ai"
                />
              </div>

              <p className="config-note">
                💡 Obtenha seu Channel UUID no painel do Weni ao criar um canal WebChat.
              </p>
            </>
          )}

          {/* Aba Aparência */}
          {activeTab === 'appearance' && (
            <>
              {/* Presets de cores */}
              <div className="config-section">
                <label className="config-section-label">Temas prontos</label>
                <div className="color-presets">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      className="color-preset"
                      onClick={() => applyPreset(preset)}
                      title={preset.name}
                    >
                      <span 
                        className="color-preset-swatch"
                        style={{ background: `linear-gradient(135deg, ${preset.primary} 0%, ${preset.secondary} 100%)` }}
                      />
                      <span className="color-preset-name">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cores customizadas */}
              <div className="config-section">
                <label className="config-section-label">Cores personalizadas</label>
                
                <div className="color-grid">
                  <div className="color-field">
                    <label>Cor primária</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => updateConfig('primaryColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.primaryColor}
                        onChange={(e) => updateConfig('primaryColor', e.target.value)}
                        placeholder="#6366f1"
                      />
                    </div>
                  </div>

                  <div className="color-field">
                    <label>Cor secundária</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.secondaryColor}
                        onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.secondaryColor}
                        onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                        placeholder="#818cf8"
                      />
                    </div>
                  </div>

                  <div className="color-field">
                    <label>Fundo</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.backgroundColor}
                        onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.backgroundColor}
                        onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                        placeholder="#0f0f23"
                      />
                    </div>
                  </div>

                  <div className="color-field">
                    <label>Mensagem usuário</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.userMessageColor}
                        onChange={(e) => updateConfig('userMessageColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.userMessageColor}
                        onChange={(e) => updateConfig('userMessageColor', e.target.value)}
                        placeholder="#6366f1"
                      />
                    </div>
                  </div>

                  <div className="color-field">
                    <label>Mensagem bot</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.botMessageColor}
                        onChange={(e) => updateConfig('botMessageColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.botMessageColor}
                        onChange={(e) => updateConfig('botMessageColor', e.target.value)}
                        placeholder="#1e1e3f"
                      />
                    </div>
                  </div>

                  <div className="color-field">
                    <label>Topo (header)</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.headerColor}
                        onChange={(e) => updateConfig('headerColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.headerColor}
                        onChange={(e) => updateConfig('headerColor', e.target.value)}
                        placeholder="#6366f1"
                      />
                    </div>
                  </div>

                  <div className="color-field">
                    <label>Rodapé (input)</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.footerColor}
                        onChange={(e) => updateConfig('footerColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.footerColor}
                        onChange={(e) => updateConfig('footerColor', e.target.value)}
                        placeholder="#1e1e3f"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cores de Texto */}
              <div className="config-section">
                <label className="config-section-label">
                  <Type size={14} />
                  Cores de Texto
                </label>
                
                <div className="color-grid">
                  <div className="color-field">
                    <label>Texto header</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.textHeaderColor}
                        onChange={(e) => updateConfig('textHeaderColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.textHeaderColor}
                        onChange={(e) => updateConfig('textHeaderColor', e.target.value)}
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>

                  <div className="color-field">
                    <label>Texto mensagem usuário</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.textUserMessageColor}
                        onChange={(e) => updateConfig('textUserMessageColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.textUserMessageColor}
                        onChange={(e) => updateConfig('textUserMessageColor', e.target.value)}
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>

                  <div className="color-field">
                    <label>Texto mensagem bot</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.textBotMessageColor}
                        onChange={(e) => updateConfig('textBotMessageColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.textBotMessageColor}
                        onChange={(e) => updateConfig('textBotMessageColor', e.target.value)}
                        placeholder="#e2e8f0"
                      />
                    </div>
                  </div>

                  <div className="color-field">
                    <label>Texto input</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.textInputColor}
                        onChange={(e) => updateConfig('textInputColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.textInputColor}
                        onChange={(e) => updateConfig('textInputColor', e.target.value)}
                        placeholder="#e2e8f0"
                      />
                    </div>
                  </div>

                  <div className="color-field">
                    <label>Placeholder</label>
                    <div className="color-input-wrapper">
                      <input
                        type="color"
                        value={config.textPlaceholderColor}
                        onChange={(e) => updateConfig('textPlaceholderColor', e.target.value)}
                      />
                      <input
                        type="text"
                        value={config.textPlaceholderColor}
                        onChange={(e) => updateConfig('textPlaceholderColor', e.target.value)}
                        placeholder="#94a3b8"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar/Logo */}
              <div className="config-section">
                <label className="config-section-label">
                  <Image size={14} />
                  Logo / Avatar
                </label>
                <div className="config-field">
                  <input
                    type="text"
                    value={config.avatarUrl || ''}
                    onChange={(e) => updateConfig('avatarUrl', e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                  />
                  {config.avatarUrl && (
                    <div className="avatar-preview">
                      <img src={config.avatarUrl} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Aba Textos */}
          {activeTab === 'texts' && (
            <>
              <div className="config-field">
                <label>Título do chat</label>
                <input
                  type="text"
                  value={config.title || ''}
                  onChange={(e) => updateConfig('title', e.target.value)}
                  placeholder="Nome do chat"
                />
              </div>

              <div className="config-field">
                <label>Subtítulo</label>
                <input
                  type="text"
                  value={config.subtitle || ''}
                  onChange={(e) => updateConfig('subtitle', e.target.value)}
                  placeholder="Status ou descrição"
                />
              </div>

              <div className="config-field">
                <label>Placeholder do input</label>
                <input
                  type="text"
                  value={config.inputPlaceholder || ''}
                  onChange={(e) => updateConfig('inputPlaceholder', e.target.value)}
                  placeholder="Digite sua mensagem..."
                />
              </div>

              <div className="config-field">
                <label>Mensagem inicial (trigger)</label>
                <input
                  type="text"
                  value={config.initPayload || ''}
                  onChange={(e) => updateConfig('initPayload', e.target.value)}
                  placeholder="oi (opcional)"
                />
                <p className="config-hint">
                  Mensagem enviada automaticamente ao conectar
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Conteúdo da demo */}
      <div className="demo-content">
        <span className="demo-badge">Open Source</span>
        
        <h1 className="demo-title">
          WebChat Custom
        </h1>
        
        <p className="demo-description">
          Seu próprio webchat inspirado no Weni WebChat React. 
          Conecte-se ao socket do Weni com total controle sobre a UI e experiência.
        </p>

        <div className="demo-features">
          <div className="demo-feature">
            <MessageCircle size={16} className="demo-feature-icon" />
            <span>Socket.IO</span>
          </div>
          <div className="demo-feature">
            <Zap size={16} className="demo-feature-icon" />
            <span>Real-time</span>
          </div>
          <div className="demo-feature">
            <Palette size={16} className="demo-feature-icon" />
            <span>Customizável</span>
          </div>
          <div className="demo-feature">
            <Shield size={16} className="demo-feature-icon" />
            <span>TypeScript</span>
          </div>
          <div className="demo-feature">
            <Code size={16} className="demo-feature-icon" />
            <span>React 18</span>
          </div>
        </div>

        <p className="demo-hint">
          Clique no botão <span>💬</span> no canto inferior direito para testar
        </p>
      </div>

      {/* Widget do Chat */}
      <ChatWidget 
        config={config}
        autoConnect={false}
        startOpen={false}
      />
    </div>
  );
}

export default App;
