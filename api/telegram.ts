import { VercelRequest, VercelResponse } from '@vercel/node';

// Interface para update do Telegram
interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    date: number;
    text?: string;
  };
}

// Armazenar chats inscritos (em produção, usar banco de dados)
const subscribedChats = new Set<number>();

// Enviar mensagem via Telegram
async function sendMessage(chatId: number, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN não configurado');
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return false;
  }
}

// Handler do webhook
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const update: TelegramUpdate = req.body;

  // Verificar se é uma mensagem de texto
  if (!update.message || !update.message.text) {
    return res.status(200).json({ ok: true });
  }

  const chatId = update.message.chat.id;
  const text = update.message.text.toLowerCase();
  const firstName = update.message.from.first_name;

  // Comando: /start
  if (text === '/start') {
    subscribedChats.add(chatId);

    const welcomeMessage = `
🏍️ <b>Bem-vindo ao Miuraboy Bot!</b>

Olá <b>${firstName}</b>! 

Você será notificado em tempo real sobre:
💥 <b>Batidas</b> na rua
🕳️ <b>Buracos</b> e obstáculos
🌧️ <b>Chuva</b> e mau tempo
🚨 <b>Polícia</b> e blitz
⚠️ <b>Acidentes</b> e situações de risco
📍 <b>Outros problemas</b> na região

<b>Comandos disponíveis:</b>
/start - Iniciar bot
/parar - Parar de receber alertas
/ajuda - Ver ajuda
/status - Ver status de conexão

Boa sorte na rua! 🚀
    `.trim();

    await sendMessage(chatId, welcomeMessage);
    return res.status(200).json({ ok: true });
  }

  // Comando: /parar
  if (text === '/parar' || text === '/stop') {
    subscribedChats.delete(chatId);

    const stopMessage = `
👋 <b>Você foi desinscrever dos alertas!</b>

Para receber alertas novamente, use /start
    `.trim();

    await sendMessage(chatId, stopMessage);
    return res.status(200).json({ ok: true });
  }

  // Comando: /ajuda
  if (text === '/ajuda' || text === '/help') {
    const helpMessage = `
❓ <b>Como usar o Miuraboy Bot</b>

<b>1. Abra o app Miuraboy</b>
   Acesse: https://miuraboy.vercel.app

<b>2. Reporte um problema</b>
   Clique em "Reportar Alerta"
   Escolha o tipo (batida, buraco, etc)
   Descreva o local e a situação

<b>3. Receba notificações</b>
   Todos os motoboys inscritos receberão o alerta
   Você também receberá alertas de outros

<b>Tipos de alerta:</b>
💥 Batida
🕳️ Buraco
🌧️ Chuva
🚨 Polícia
⚠️ Acidente
📍 Outro

<b>Dúvidas?</b>
Envie uma mensagem ou use /status
    `.trim();

    await sendMessage(chatId, helpMessage);
    return res.status(200).json({ ok: true });
  }

  // Comando: /status
  if (text === '/status') {
    const statusMessage = `
✅ <b>Status do Bot</b>

🟢 Bot conectado e funcionando
📍 Localização: Ativo
🔔 Notificações: Ativas
👥 Inscritos: ${subscribedChats.size}

Você está recebendo alertas! 🎉
    `.trim();

    await sendMessage(chatId, statusMessage);
    return res.status(200).json({ ok: true });
  }

  // Mensagem padrão
  const defaultMessage = `
👋 Olá <b>${firstName}</b>!

Não entendi seu comando. 

Use um dos comandos abaixo:
/start - Iniciar e receber alertas
/parar - Parar de receber alertas
/ajuda - Ver instruções
/status - Ver status

Ou acesse o app: https://miuraboy.vercel.app
  `.trim();

  await sendMessage(chatId, defaultMessage);
  return res.status(200).json({ ok: true });
}
