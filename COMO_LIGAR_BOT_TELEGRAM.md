# 🤖 GUIA COMPLETO: Como Ligar o Bot Telegram do Miuraboy

## 📋 Índice
1. [Criar o Bot](#1-criar-o-bot)
2. [Configurar no Vercel](#2-configurar-no-vercel)
3. [Registrar o Webhook](#3-registrar-o-webhook)
4. [Testar o Bot](#4-testar-o-bot)
5. [Integrar com o App](#5-integrar-com-o-app)
6. [Troubleshooting](#troubleshooting)

---

## 1. Criar o Bot

### Passo 1.1: Abrir o BotFather

1. Abra o Telegram (web ou app)
2. Procure por: `@BotFather`
3. Clique para abrir a conversa

### Passo 1.2: Criar novo bot

1. Envie o comando: `/newbot`
2. BotFather vai responder:
```
Alright, a new bot. How are we going to call it? 
Please choose a name for your bot.
```

3. Responda com o nome do bot (ex: `Miuraboy Bot`)

### Passo 1.3: Escolher username

BotFather vai pedir um username:
```
Good. Now let's choose a username for your bot. 
It must end in `bot`. For example, TetrisBot or tetris_bot.
```

Responda com um username único (ex: `miuraboy_alerts_bot`)

**Importante:** O username deve:
- Terminar em `_bot` ou `bot`
- Ser único (não pode estar em uso)
- Ter apenas letras, números e underscore

### Passo 1.4: Copiar o Token

BotFather vai enviar algo como:

```
Done! Congratulations on your new bot. You will find it at 
t.me/miuraboy_alerts_bot. You can now add a description, about 
section and profile picture for your bot, see /help for a list 
of commands. By the way, when you've finished with your bot, 
remember that you can always create a new one with /newbot.

Use this token to access the HTTP API:
123456789:ABCdefGHIjklmnoPQRstuvWXYZabcdefGHI

For a description of the Bot API, see this page:
https://core.telegram.org/bots/api
```

**⚠️ COPIE E GUARDE O TOKEN COM SEGURANÇA!**

Exemplo de token:
```
123456789:ABCdefGHIjklmnoPQRstuvWXYZabcdefGHI
```

---

## 2. Configurar no Vercel

### Passo 2.1: Adicionar variável de ambiente

1. Acesse seu projeto no Vercel:
   - https://vercel.com/dashboard

2. Clique no projeto `miuraboy`

3. Vá em **Settings** (engrenagem no topo)

4. Clique em **Environment Variables** (no menu esquerdo)

5. Clique em **Add New**

6. Preencha:
   - **Name**: `TELEGRAM_BOT_TOKEN`
   - **Value**: Cole o token do BotFather
   - **Environments**: Marque todas (Production, Preview, Development)

7. Clique em **Save**

### Passo 2.2: Fazer Deploy

Agora você precisa fazer deploy com a nova variável:

```bash
# No seu computador
cd ~/miuraboy

# Fazer commit
git add .
git commit -m "Add Telegram bot token"

# Fazer push
git push origin main
```

Vercel fará deploy automático em ~1-2 minutos.

---

## 3. Registrar o Webhook

O webhook é como o Telegram sabe para onde enviar as mensagens.

### Passo 3.1: Obter a URL do seu app

Seu app está em:
```
https://miuraboy.vercel.app
```

### Passo 3.2: Registrar o webhook

Abra um terminal e execute:

```bash
curl -X POST https://api.telegram.org/bot123456789:ABCdefGHIjklmnoPQRstuvWXYZabcdefGHI/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url":"https://miuraboy.vercel.app/api/telegram"}'
```

**Substitua:**
- `123456789:ABCdefGHIjklmnoPQRstuvWXYZabcdefGHI` pelo seu token

**Resposta esperada:**
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

### Passo 3.3: Verificar se funcionou

Execute:

```bash
curl https://api.telegram.org/bot123456789:ABCdefGHIjklmnoPQRstuvWXYZabcdefGHI/getWebhookInfo
```

Você deve ver:
```json
{
  "ok": true,
  "result": {
    "url": "https://miuraboy.vercel.app/api/telegram",
    "has_custom_certificate": false,
    "pending_update_count": 0,
    "ip_address": "...",
    "last_error_date": 0,
    "max_connections": 40
  }
}
```

Se `pending_update_count` for 0, tudo está funcionando! ✅

---

## 4. Testar o Bot

### Passo 4.1: Abrir o bot no Telegram

1. Abra o Telegram
2. Procure por: `@seu_username_bot` (ex: `@miuraboy_alerts_bot`)
3. Clique para abrir

### Passo 4.2: Enviar comandos

Teste os seguintes comandos:

**Comando 1: /start**
```
/start
```

Você deve receber:
```
🏍️ Bem-vindo ao Miuraboy Bot!

Olá [Seu Nome]! 

Você será notificado em tempo real sobre:
💥 Batidas na rua
🕳️ Buracos e obstáculos
🌧️ Chuva e mau tempo
🚨 Polícia e blitz
⚠️ Acidentes e situações de risco
📍 Outros problemas na região

Comandos disponíveis:
/start - Iniciar bot
/parar - Parar de receber alertas
/ajuda - Ver ajuda
/status - Ver status de conexão

Boa sorte na rua! 🚀
```

**Comando 2: /ajuda**
```
/ajuda
```

**Comando 3: /status**
```
/status
```

Se receber respostas, o bot está funcionando! ✅

---

## 5. Integrar com o App

### Passo 5.1: Adicionar componentes

No arquivo `src/App.tsx`, adicione:

```tsx
import TelegramConnect from './components/TelegramConnect'
import AlertReporter from './components/AlertReporter'

function App() {
  return (
    <div>
      {/* ... outros componentes ... */}
      
      {/* Adicione em um local visível */}
      <section className="p-6">
        <TelegramConnect />
      </section>
      
      {/* Botão flutuante para reportar */}
      <AlertReporter />
    </div>
  )
}
```

### Passo 5.2: Configurar Google Maps (Opcional)

Se quiser usar o mapa com alertas:

1. Crie uma chave de API no Google Cloud Console
2. Adicione como variável de ambiente:
   ```
   VITE_GOOGLE_MAPS_KEY=sua_chave_aqui
   ```

3. Adicione o componente:
```tsx
import AlertsMap from './components/AlertsMap'

// No App:
<AlertsMap />
```

### Passo 5.3: Deploy

```bash
git add .
git commit -m "Add Telegram components to app"
git push origin main
```

---

## 6. Usar o Bot

### Para Motoboys

**1. Conectar com o Bot:**
- Abra o app Miuraboy
- Procure por "Conexão Telegram"
- Clique "Conectar com Telegram"
- Abra o bot e envie `/start`

**2. Receber Alertas:**
- Você receberá notificações em tempo real
- Cada alerta mostra: tipo, local, severidade

**3. Reportar Problemas:**
- Clique no botão 🚨 no app
- Selecione o tipo
- Descreva o local
- Clique "Enviar Alerta"
- Todos recebem a notificação!

**4. Gerenciar:**
- `/parar` - Parar notificações
- `/ajuda` - Ver instruções
- `/status` - Ver status

---

## Troubleshooting

### ❌ "Webhook não funciona"

**Solução 1: Verificar token**
```bash
curl https://api.telegram.org/botTOKEN/getMe
```

Se retornar erro 401, o token está errado.

**Solução 2: Resetar webhook**
```bash
# Remover webhook
curl -X POST https://api.telegram.org/botTOKEN/setWebhook -d url=

# Registrar novamente
curl -X POST https://api.telegram.org/botTOKEN/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url":"https://miuraboy.vercel.app/api/telegram"}'
```

**Solução 3: Verificar logs do Vercel**
1. Vá para https://vercel.com/dashboard
2. Clique no projeto
3. Vá em "Deployments"
4. Clique no deployment mais recente
5. Vá em "Logs"
6. Procure por erros

### ❌ "Bot não responde"

**Solução 1: Verificar webhook status**
```bash
curl https://api.telegram.org/botTOKEN/getWebhookInfo
```

Se `pending_update_count` for alto, há problema no webhook.

**Solução 2: Verificar arquivo `/api/telegram.ts`**
- Certifique-se de que o arquivo existe
- Verifique se não há erros de sintaxe

**Solução 3: Fazer novo deploy**
```bash
git add .
git commit -m "Fix bot"
git push origin main
```

### ❌ "Mensagens não chegam"

**Solução 1: Verificar chat ID**
- Envie uma mensagem ao bot
- Verifique nos logs se o chat ID está correto

**Solução 2: Verificar permissões**
- Certifique-se de que iniciou o bot com `/start`
- Verifique se não bloqueou o bot

**Solução 3: Verificar API**
```bash
curl -X POST https://api.telegram.org/botTOKEN/sendMessage \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"SEU_CHAT_ID","text":"Teste"}'
```

### ❌ "Erro 401 Unauthorized"

**Causa:** Token incorreto ou expirado

**Solução:**
1. Vá para BotFather
2. Envie `/mybots`
3. Selecione seu bot
4. Clique em "API Token"
5. Copie o novo token
6. Atualize no Vercel

---

## ✅ Checklist Final

- [ ] Bot criado no Telegram
- [ ] Token copiado
- [ ] Token adicionado no Vercel
- [ ] Webhook registrado
- [ ] Webhook testado com sucesso
- [ ] Bot responde a comandos
- [ ] Componentes adicionados ao app
- [ ] App feito deploy
- [ ] Conectado com o bot via app
- [ ] Alertas funcionando

---

## 🎉 Pronto!

Seu bot está funcionando! Agora:

1. Compartilhe o link do app com motoboys
2. Eles conectam com o bot
3. Começam a receber alertas em tempo real

**Boa sorte! 🚀**

---

## 📞 Recursos

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [BotFather](https://t.me/botfather)
- [Vercel Docs](https://vercel.com/docs)
- [Seu App](https://miuraboy.vercel.app)
