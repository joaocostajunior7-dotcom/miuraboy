# 🤖 Sistema Completo de Bot Telegram + App Miuraboy

## 📊 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        MIURABOY APP                          │
│  (React + TypeScript + TailwindCSS)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ TelegramConnect    │ AlertReporter    │ App Principal  │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP Requests
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                   VERCEL FUNCTIONS                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ /api/alerts.ts      │ /api/telegram.ts                │ │
│  │ - Criar alertas     │ - Webhook do bot                │ │
│  │ - Listar alertas    │ - Processar mensagens           │ │
│  │ - Alertas próximos  │ - Comandos (/start, /parar)    │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP Requests
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                  TELEGRAM BOT API                           │
│  - Enviar mensagens                                         │
│  - Receber atualizações                                     │
│  - Gerenciar chats                                          │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    TELEGRAM USERS                           │
│  - Motoboys recebem alertas em tempo real                   │
│  - Podem reportar novos problemas                           │
│  - Interagem com o bot via comandos                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Fluxo de Funcionamento

### Cenário 1: Usuário reporta um problema

```
1. Usuário abre o app Miuraboy
2. Clica no botão 🚨 "Reportar Alerta"
3. Seleciona tipo (batida, buraco, etc)
4. Descreve o local e problema
5. Clica "Enviar Alerta"
   ↓
6. App envia POST para /api/alerts
7. API cria o alerta
8. API envia mensagem via Telegram para todos os inscritos
9. Todos os motoboys recebem a notificação em tempo real
```

### Cenário 2: Usuário conecta com o bot

```
1. Usuário clica "Conectar com Telegram"
2. App abre o Telegram e o bot (@MiuraboyBot)
3. Usuário envia /start
4. Bot responde com mensagens de boas-vindas
5. Usuário é adicionado à lista de inscritos
6. Começa a receber alertas em tempo real
```

---

## 📁 Arquivos Criados

### Backend (Vercel Functions)

**`/api/alerts.ts`**
- Gerencia alertas
- Ações: create, list, nearby, test
- Envia notificações via Telegram

**`/api/telegram.ts`**
- Webhook do Telegram
- Processa mensagens dos usuários
- Comandos: /start, /parar, /ajuda, /status

### Frontend (React Components)

**`/src/components/TelegramConnect.tsx`**
- Interface para conectar com Telegram
- Botões: Conectar, Testar, Desconectar
- Mostra status de conexão

**`/src/components/AlertReporter.tsx`**
- Modal para reportar alertas
- Seleção de tipo, severidade, local
- Geolocalização integrada

### Documentação

**`SETUP_TELEGRAM_BOT.md`**
- Guia passo a passo
- Como criar o bot
- Como configurar o webhook

---

## 🚀 Como Implementar

### Passo 1: Criar o Bot Telegram

Siga o guia em `SETUP_TELEGRAM_BOT.md`:

1. Procure por `@BotFather` no Telegram
2. Envie `/newbot`
3. Copie o token
4. Configure no Vercel (Environment Variables)

### Passo 2: Configurar o Webhook

Execute no terminal:

```bash
curl -X POST https://api.telegram.org/botTOKEN/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url":"https://seu-dominio.vercel.app/api/telegram"}'
```

### Passo 3: Adicionar Componentes ao App

No `src/App.tsx`:

```tsx
import TelegramConnect from './components/TelegramConnect'
import AlertReporter from './components/AlertReporter'

function App() {
  return (
    <div>
      {/* ... outros componentes ... */}
      
      {/* Adicione em um local visível */}
      <TelegramConnect />
      
      {/* Botão flutuante para reportar */}
      <AlertReporter />
    </div>
  )
}
```

### Passo 4: Fazer Deploy

```bash
git add .
git commit -m "Add Telegram bot integration"
git push origin main
```

Vercel faz deploy automático!

---

## 🎮 Como Usar

### Para Motoboys

**1. Conectar com o Bot:**
- Abra o app Miuraboy
- Vá para "Configurações" ou "Conexão Telegram"
- Clique "Conectar com Telegram"
- Abra o bot e envie `/start`

**2. Receber Alertas:**
- Você receberá notificações em tempo real
- Cada alerta mostra: tipo, local, severidade, descrição

**3. Reportar Problemas:**
- Clique no botão 🚨 no app
- Selecione o tipo de problema
- Descreva o local
- Clique "Enviar Alerta"
- Todos os motoboys recebem a notificação

**4. Gerenciar Notificações:**
- `/parar` - Parar de receber alertas
- `/ajuda` - Ver instruções
- `/status` - Ver status de conexão

---

## 📊 Tipos de Alertas

| Tipo | Emoji | Descrição |
|------|-------|-----------|
| Batida | 💥 | Batida grande no asfalto |
| Buraco | 🕳️ | Buraco ou obstáculo |
| Chuva | 🌧️ | Chuva ou mau tempo |
| Polícia | 🚨 | Blitz ou abordagem |
| Acidente | ⚠️ | Acidente na via |
| Outro | 📍 | Outro tipo de problema |

---

## 🎯 Severidades

| Severidade | Emoji | Descrição |
|-----------|-------|-----------|
| Baixa | 🟢 | Informativo |
| Média | 🟡 | Atenção recomendada |
| Alta | 🔴 | Perigo iminente |

---

## 💡 Funcionalidades Avançadas

### 1. Alertas por Localização
```typescript
// Obter alertas próximos
POST /api/alerts
{
  "action": "nearby",
  "latitude": -23.5505,
  "longitude": -46.6333,
  "radius": 5  // km
}
```

### 2. Histórico de Alertas
```typescript
// Listar últimos 20 alertas
POST /api/alerts
{
  "action": "list"
}
```

### 3. Geolocalização
- App captura latitude/longitude automaticamente
- Botão 📍 para capturar localização
- Alertas mostram distância do usuário

### 4. Persistência de Dados
- localStorage no app (dados locais)
- Vercel Functions (sem banco de dados)
- Telegram como canal de notificação

---

## 🔐 Segurança

### Variáveis de Ambiente

Nunca commite o token! Use variáveis:

```bash
# .env.local (não commitar)
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklmnoPQRstuvWXYZabcdefGHI
```

### No Vercel

1. Vá para Settings → Environment Variables
2. Adicione `TELEGRAM_BOT_TOKEN`
3. Selecione Production, Preview, Development

---

## 🚨 Troubleshooting

### "Webhook não funciona"
```bash
# Verificar status
curl https://api.telegram.org/botTOKEN/getWebhookInfo

# Resetar
curl -X POST https://api.telegram.org/botTOKEN/setWebhook \
  -d url=
```

### "Bot não responde"
- Verifique se o token está correto
- Verifique os logs do Vercel
- Teste com: `curl https://api.telegram.org/botTOKEN/getMe`

### "Mensagens não chegam"
- Verifique o chat ID
- Verifique se o usuário iniciou o bot (/start)
- Verifique os logs do Vercel

---

## 📈 Próximos Passos

### Fase 1 (Atual)
✅ Bot básico com alertas
✅ Componentes React
✅ API Vercel Functions

### Fase 2 (Futuro)
- [ ] Banco de dados (MongoDB, Firebase)
- [ ] Histórico de alertas persistente
- [ ] Mapa com alertas em tempo real
- [ ] Ranking de motoboys mais confiáveis
- [ ] Sistema de reputação

### Fase 3 (Longo prazo)
- [ ] Integração com Google Maps
- [ ] Notificações push
- [ ] Grupos de bairros
- [ ] Sistema de pontos/rewards
- [ ] Monetização (premium features)

---

## 📞 Suporte

### Documentação
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Vercel Functions](https://vercel.com/docs/functions/serverless-functions)
- [React Docs](https://react.dev)

### Comunidade
- Telegram: @MiuraboyBot
- GitHub: seu-usuario/miuraboy

---

## 🎉 Pronto!

Você tem um sistema completo de alertas em tempo real!

**Próximos passos:**
1. Crie o bot no Telegram
2. Configure o webhook
3. Adicione os componentes ao app
4. Faça deploy
5. Teste com amigos motoboys

**Boa sorte! 🚀**
