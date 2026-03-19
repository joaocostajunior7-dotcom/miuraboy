# 🤖 Guia de Configuração - Telegram Bot Miuraboy

## 📋 Resumo

Este guia mostra como criar e configurar o bot do Telegram para o Miuraboy. O bot enviará alertas em tempo real para os motoboys sobre problemas na rua.

---

## 🚀 Passo 1: Criar o Bot no Telegram

### 1.1 Abra o Telegram
- Acesse: https://web.telegram.org ou abra o app

### 1.2 Procure por BotFather
- Procure por: `@BotFather`
- Clique para abrir

### 1.3 Criar novo bot
- Envie: `/newbot`
- BotFather vai pedir um nome
- Nome do bot: `Miuraboy Bot` (ou outro nome)
- Username do bot: `miuraboy_bot` (deve ser único e terminar em `_bot`)

### 1.4 Copiar o Token
- BotFather vai enviar um token como este:
```
123456789:ABCdefGHIjklmnoPQRstuvWXYZabcdefGHI
```

**Guarde este token com segurança!** ⚠️

---

## 🔧 Passo 2: Configurar o Webhook no Vercel

### 2.1 Adicionar variável de ambiente

1. Acesse seu projeto no Vercel: https://vercel.com/dashboard
2. Clique em "Settings" → "Environment Variables"
3. Clique em "Add New"
4. Preencha:
   - **Name**: `TELEGRAM_BOT_TOKEN`
   - **Value**: Cole o token do BotFather
   - **Environments**: Production, Preview, Development
5. Clique em "Save"

### 2.2 Registrar o Webhook

Execute este comando (substitua `TOKEN` e `URL`):

```bash
curl -X POST https://api.telegram.org/botTOKEN/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url":"https://seu-dominio.vercel.app/api/telegram"}'
```

**Exemplo real:**
```bash
curl -X POST https://api.telegram.org/bot123456789:ABCdefGHIjklmnoPQRstuvWXYZabcdefGHI/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url":"https://miuraboy.vercel.app/api/telegram"}'
```

### 2.3 Verificar se funcionou

```bash
curl https://api.telegram.org/botTOKEN/getWebhookInfo
```

Você deve ver:
```json
{
  "ok": true,
  "result": {
    "url": "https://seu-dominio.vercel.app/api/telegram",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

---

## 📱 Passo 3: Testar o Bot

### 3.1 Abrir o bot no Telegram
- Procure por: `@seu_username_bot`
- Clique para abrir

### 3.2 Enviar comandos
- Envie: `/start`
- Você deve receber uma mensagem de boas-vindas

### 3.3 Testar no app
1. Abra o app Miuraboy: https://miuraboy.vercel.app
2. Vá para "Configurações" ou "Conexão Telegram"
3. Clique em "Conectar com Telegram"
4. Clique em "Testar Conexão"
5. Você deve receber uma mensagem no Telegram

---

## 🎯 Passo 4: Integrar com o App

### 4.1 Componentes já criados

O app já tem os componentes prontos:

- **TelegramConnect.tsx** - Conectar/desconectar
- **AlertReporter.tsx** - Reportar alertas
- **api/telegram.ts** - Webhook do bot
- **api/alerts.ts** - API de alertas

### 4.2 Adicionar ao App

No arquivo `src/App.tsx`, adicione:

```tsx
import TelegramConnect from './components/TelegramConnect'
import AlertReporter from './components/AlertReporter'

// Dentro do componente App:
<TelegramConnect />
<AlertReporter />
```

---

## 📊 Estrutura de Dados

### Alerta
```typescript
{
  id: string
  type: 'batida' | 'buraco' | 'chuva' | 'policia' | 'acidente' | 'outro'
  location: string
  latitude?: number
  longitude?: number
  description: string
  severity: 'baixa' | 'media' | 'alta'
  userId: string
  timestamp: string
  telegramChatId?: string
}
```

### Endpoints da API

#### POST /api/alerts
**Criar alerta:**
```json
{
  "action": "create",
  "alert": {
    "type": "batida",
    "location": "Av. Paulista, 1000",
    "description": "Batida grande no asfalto",
    "severity": "alta",
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "chatId": "123456789"
}
```

**Listar alertas:**
```json
{
  "action": "list"
}
```

**Alertas próximos:**
```json
{
  "action": "nearby",
  "latitude": -23.5505,
  "longitude": -46.6333,
  "radius": 5
}
```

---

## 🔐 Segurança

### Boas práticas:

1. **Nunca compartilhe o token** do bot
2. **Use variáveis de ambiente** (já configurado)
3. **Valide os dados** antes de processar
4. **Use HTTPS** (Vercel oferece automaticamente)
5. **Limpe dados antigos** periodicamente

---

## 🚨 Troubleshooting

### "Webhook não funciona"
- Verifique se o token está correto
- Verifique se a URL do webhook está correta
- Verifique se o arquivo `api/telegram.ts` existe

### "Bot não responde"
- Verifique se o webhook está registrado: `getWebhookInfo`
- Verifique os logs do Vercel
- Tente resetar o webhook: `setWebhook` com URL vazia, depois configure novamente

### "Mensagens não chegam"
- Verifique se o chat ID está correto
- Verifique se o bot tem permissão para enviar mensagens
- Verifique os logs do Vercel

### "Erro 401 Unauthorized"
- Token incorreto ou expirado
- Gere um novo token com BotFather

---

## 📞 Comandos do Bot

| Comando | Descrição |
|---------|-----------|
| `/start` | Iniciar bot e receber alertas |
| `/parar` | Parar de receber alertas |
| `/ajuda` | Ver instruções |
| `/status` | Ver status de conexão |

---

## 🎉 Pronto!

Seu bot está configurado e funcionando! Agora:

1. Motoboys abrem o app
2. Conectam com o Telegram
3. Reportam problemas
4. Todos recebem alertas em tempo real

**Boa sorte! 🚀**

---

## 📚 Recursos Úteis

- [Documentação Telegram Bot API](https://core.telegram.org/bots/api)
- [BotFather](https://t.me/botfather)
- [Vercel Docs](https://vercel.com/docs)
- [Miuraboy App](https://miuraboy.vercel.app)
