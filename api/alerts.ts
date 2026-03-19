import { VercelRequest, VercelResponse } from '@vercel/node';

// Interface para alertas
interface Alert {
  id: string;
  type: 'batida' | 'buraco' | 'chuva' | 'policia' | 'acidente' | 'outro';
  location: string;
  latitude?: number;
  longitude?: number;
  description: string;
  severity: 'baixa' | 'media' | 'alta';
  userId: string;
  timestamp: string;
  telegramChatId?: string;
}

// Simular banco de dados em memória (em produção, usar banco de dados real)
let alerts: Alert[] = [];

// Função para enviar mensagem via Telegram
async function sendTelegramMessage(chatId: string, message: string) {
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
        text: message,
        parse_mode: 'HTML',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar mensagem Telegram:', error);
    return false;
  }
}

// Formatar mensagem de alerta
function formatAlertMessage(alert: Alert): string {
  const emojiMap: Record<string, string> = {
    batida: '💥',
    buraco: '🕳️',
    chuva: '🌧️',
    policia: '🚨',
    acidente: '⚠️',
    outro: '📍',
  };

  const severityMap: Record<string, string> = {
    baixa: '🟢 Baixa',
    media: '🟡 Média',
    alta: '🔴 Alta',
  };

  return `
${emojiMap[alert.type]} <b>ALERTA - ${alert.type.toUpperCase()}</b>

📍 <b>Local:</b> ${alert.location}
⚠️ <b>Severidade:</b> ${severityMap[alert.severity]}
📝 <b>Descrição:</b> ${alert.description}
🕐 <b>Hora:</b> ${new Date(alert.timestamp).toLocaleTimeString('pt-BR')}

⚡ <i>Cuidado ao passar por essa região!</i>
  `.trim();
}

// Handler principal da API
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apenas POST é permitido
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { action, alert, chatId } = req.body;

  // Ação 1: Criar novo alerta
  if (action === 'create') {
    if (!alert || !alert.type || !alert.location || !alert.description) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const newAlert: Alert = {
      id: `alert_${Date.now()}`,
      type: alert.type,
      location: alert.location,
      latitude: alert.latitude,
      longitude: alert.longitude,
      description: alert.description,
      severity: alert.severity || 'media',
      userId: alert.userId || 'anonymous',
      timestamp: new Date().toISOString(),
      telegramChatId: chatId,
    };

    alerts.push(newAlert);

    // Enviar notificação para todos os usuários inscritos
    const message = formatAlertMessage(newAlert);
    
    // Aqui você enviaria para todos os chats inscritos
    // Por enquanto, apenas retornar sucesso
    
    return res.status(201).json({
      success: true,
      alert: newAlert,
      message: 'Alerta criado com sucesso!',
    });
  }

  // Ação 2: Listar alertas recentes
  if (action === 'list') {
    const recentAlerts = alerts
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 20); // Últimos 20 alertas

    return res.status(200).json({
      success: true,
      alerts: recentAlerts,
    });
  }

  // Ação 3: Obter alertas por localização
  if (action === 'nearby') {
    const { latitude, longitude, radius = 5 } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude e longitude obrigatórias' });
    }

    // Calcular distância (fórmula simplificada)
    const nearbyAlerts = alerts.filter((a) => {
      if (!a.latitude || !a.longitude) return false;
      
      const distance = Math.sqrt(
        Math.pow(a.latitude - latitude, 2) + Math.pow(a.longitude - longitude, 2)
      );
      
      return distance < radius;
    });

    return res.status(200).json({
      success: true,
      alerts: nearbyAlerts,
    });
  }

  // Ação 4: Enviar mensagem de teste
  if (action === 'test') {
    if (!chatId) {
      return res.status(400).json({ error: 'Chat ID obrigatório' });
    }

    const testMessage = `
✅ <b>Conexão com Miuraboy estabelecida!</b>

Você receberá alertas em tempo real sobre:
💥 Batidas
🕳️ Buracos
🌧️ Chuva
🚨 Polícia
⚠️ Acidentes
📍 Outros problemas

Boa sorte na rua! 🏍️
    `.trim();

    const success = await sendTelegramMessage(chatId, testMessage);

    return res.status(200).json({
      success,
      message: success ? 'Mensagem de teste enviada!' : 'Erro ao enviar mensagem',
    });
  }

  return res.status(400).json({ error: 'Ação não reconhecida' });
}
