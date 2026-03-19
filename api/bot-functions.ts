import { VercelRequest, VercelResponse } from '@vercel/node';

// Interface para funções do bot
interface BotFunction {
  name: string;
  description: string;
  icon: string;
  action: string;
}

// Banco de dados simulado
interface UserProfile {
  chatId: number;
  name: string;
  moto: string;
  phone: string;
  region: string;
  reputation: number;
  alertsReported: number;
  joinedAt: string;
}

interface AlertStats {
  total: number;
  byType: Record<string, number>;
  byRegion: Record<string, number>;
  averageSeverity: string;
}

// Simular armazenamento
let userProfiles: Map<number, UserProfile> = new Map();
let alertStats: AlertStats = {
  total: 0,
  byType: {},
  byRegion: {},
  averageSeverity: 'media',
};

// ============================================
// FUNÇÃO 1: Perfil do Usuário
// ============================================
export async function getUserProfile(chatId: number): Promise<UserProfile | null> {
  return userProfiles.get(chatId) || null;
}

export async function createUserProfile(
  chatId: number,
  data: Partial<UserProfile>
): Promise<UserProfile> {
  const profile: UserProfile = {
    chatId,
    name: data.name || 'Motoboy',
    moto: data.moto || 'Não informada',
    phone: data.phone || '',
    region: data.region || 'São Paulo',
    reputation: 0,
    alertsReported: 0,
    joinedAt: new Date().toISOString(),
  };

  userProfiles.set(chatId, profile);
  return profile;
}

// ============================================
// FUNÇÃO 2: Sistema de Reputação
// ============================================
export function calculateReputation(profile: UserProfile): number {
  const baseReputation = 100;
  const pointsPerAlert = 5;
  const reputation = baseReputation + profile.alertsReported * pointsPerAlert;
  return Math.min(reputation, 1000); // Máximo 1000 pontos
}

export function getReputationBadge(reputation: number): string {
  if (reputation >= 800) return '⭐⭐⭐⭐⭐ Lendário';
  if (reputation >= 600) return '⭐⭐⭐⭐ Confiável';
  if (reputation >= 400) return '⭐⭐⭐ Bom';
  if (reputation >= 200) return '⭐⭐ Iniciante';
  return '⭐ Novo';
}

// ============================================
// FUNÇÃO 3: Estatísticas de Alertas
// ============================================
export function updateAlertStats(
  alertType: string,
  region: string,
  severity: string
): void {
  alertStats.total++;

  // Por tipo
  alertStats.byType[alertType] = (alertStats.byType[alertType] || 0) + 1;

  // Por região
  alertStats.byRegion[region] = (alertStats.byRegion[region] || 0) + 1;

  // Severidade média
  const severityMap = { baixa: 1, media: 2, alta: 3 };
  const currentAvg = severityMap[alertStats.averageSeverity as keyof typeof severityMap] || 2;
  const newAvg = (currentAvg + severityMap[severity as keyof typeof severityMap]) / 2;
  alertStats.averageSeverity = newAvg > 2.5 ? 'alta' : newAvg > 1.5 ? 'media' : 'baixa';
}

export function getAlertStats(): AlertStats {
  return alertStats;
}

// ============================================
// FUNÇÃO 4: Alertas Personalizados por Região
// ============================================
export function getRegionalAlerts(region: string, limit: number = 5): string {
  const regionAlerts = alertStats.byRegion[region] || 0;
  const topType = Object.entries(alertStats.byType)
    .sort(([, a], [, b]) => b - a)[0];

  return `
📊 <b>Alertas em ${region}</b>

Total na região: <b>${regionAlerts}</b>
Tipo mais comum: <b>${topType?.[0] || 'N/A'}</b> (${topType?.[1] || 0})
Severidade média: <b>${alertStats.averageSeverity}</b>

Fique atento! 🚨
  `.trim();
}

// ============================================
// FUNÇÃO 5: Ranking de Motoboys
// ============================================
export function getRanking(limit: number = 10): string {
  const ranking = Array.from(userProfiles.values())
    .sort((a, b) => calculateReputation(b) - calculateReputation(a))
    .slice(0, limit);

  let rankingText = '🏆 <b>TOP MOTOBOYS</b>\n\n';

  ranking.forEach((user, index) => {
    const reputation = calculateReputation(user);
    const badge = getReputationBadge(reputation);
    rankingText += `${index + 1}. <b>${user.name}</b> - ${badge}\n`;
    rankingText += `   Alertas: ${user.alertsReported} | Reputação: ${reputation}\n\n`;
  });

  return rankingText;
}

// ============================================
// FUNÇÃO 6: Dicas de Segurança
// ============================================
export function getSecurityTip(): string {
  const tips = [
    '💡 Sempre use capacete! Pode salvar sua vida.',
    '💡 Verifique pneus e freios regularmente.',
    '💡 Dirija defensivamente, antecipe problemas.',
    '💡 Use coletes refletivos à noite.',
    '💡 Mantenha distância segura de outros veículos.',
    '💡 Evite usar celular enquanto dirige.',
    '💡 Conhecer as ruas reduz acidentes.',
    '💡 Combustível de qualidade economiza dinheiro.',
    '💡 Manutenção preventiva evita surpresas.',
    '💡 Comunique-se com outros motoboys!',
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  return `\n${randomTip}`;
}

// ============================================
// FUNÇÃO 7: Previsão de Tempo (Mock)
// ============================================
export async function getWeatherAlert(region: string): Promise<string> {
  // Em produção, integrar com API de tempo real
  const weatherConditions = [
    { emoji: '☀️', text: 'Ensolarado', alert: 'Cuidado com o calor!' },
    { emoji: '🌧️', text: 'Chuva', alert: 'Via molhada, reduz velocidade!' },
    { emoji: '⛈️', text: 'Tempestade', alert: 'PERIGO! Evite sair!' },
    { emoji: '🌫️', text: 'Neblina', alert: 'Baixa visibilidade, acenda farol!' },
    { emoji: '❄️', text: 'Frio', alert: 'Pista pode estar escorregadia!' },
  ];

  const random = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

  return `
${random.emoji} <b>Tempo em ${region}</b>

Condição: ${random.text}
⚠️ ${random.alert}
  `.trim();
}

// ============================================
// FUNÇÃO 8: Histórico de Alertas do Usuário
// ============================================
export function getUserAlertHistory(chatId: number, limit: number = 5): string {
  const profile = userProfiles.get(chatId);

  if (!profile) {
    return '❌ Perfil não encontrado';
  }

  return `
📋 <b>Seus Alertas</b>

Total reportado: <b>${profile.alertsReported}</b>
Região: <b>${profile.region}</b>
Moto: <b>${profile.moto}</b>
Membro desde: <b>${new Date(profile.joinedAt).toLocaleDateString('pt-BR')}</b>

Reputação: ${getReputationBadge(calculateReputation(profile))}
  `.trim();
}

// ============================================
// FUNÇÃO 9: Notificação de Alerta Crítico
// ============================================
export function formatCriticalAlert(
  type: string,
  location: string,
  description: string,
  severity: string
): string {
  const severityEmoji = {
    baixa: '🟢',
    media: '🟡',
    alta: '🔴',
  };

  const typeEmoji: Record<string, string> = {
    batida: '💥',
    buraco: '🕳️',
    chuva: '🌧️',
    policia: '🚨',
    acidente: '⚠️',
    outro: '📍',
  };

  return `
${severityEmoji[severity]} <b>ALERTA ${severity.toUpperCase()}</b>
${typeEmoji[type] || '📍'} ${type.toUpperCase()}

📍 <b>Local:</b> ${location}
📝 <b>Descrição:</b> ${description}
🕐 <b>Hora:</b> ${new Date().toLocaleTimeString('pt-BR')}

⚡ <i>Cuidado ao passar por essa região!</i>
  `.trim();
}

// ============================================
// FUNÇÃO 10: Sistema de Notificações Inteligentes
// ============================================
export interface SmartNotification {
  type: 'alert' | 'info' | 'warning' | 'success';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

export function createSmartNotification(
  type: 'alert' | 'info' | 'warning' | 'success',
  title: string,
  message: string,
  priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
): SmartNotification {
  return {
    type,
    title,
    message,
    priority,
    timestamp: new Date().toISOString(),
  };
}

// ============================================
// FUNÇÃO 11: Busca de Alertas por Palavra-chave
// ============================================
export function searchAlerts(keyword: string): string {
  // Em produção, buscar em banco de dados real
  return `
🔍 <b>Resultados para: "${keyword}"</b>

Procurando em nossa base de dados...
(Funcionalidade em desenvolvimento)

Dica: Use /status para ver alertas recentes
  `.trim();
}

// ============================================
// FUNÇÃO 12: Configurações do Usuário
// ============================================
export interface UserSettings {
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  region: string;
  alertTypes: string[];
  minSeverity: 'baixa' | 'media' | 'alta';
}

export function getDefaultSettings(): UserSettings {
  return {
    notificationsEnabled: true,
    soundEnabled: true,
    region: 'São Paulo',
    alertTypes: ['batida', 'buraco', 'policia', 'acidente'],
    minSeverity: 'media',
  };
}

// ============================================
// Handler Principal
// ============================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { action, chatId, data } = req.body;

  try {
    switch (action) {
      case 'get-profile':
        const profile = await getUserProfile(chatId);
        return res.status(200).json({ profile });

      case 'create-profile':
        const newProfile = await createUserProfile(chatId, data);
        return res.status(201).json({ profile: newProfile });

      case 'get-reputation':
        const userProfile = await getUserProfile(chatId);
        if (!userProfile) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const reputation = calculateReputation(userProfile);
        const badge = getReputationBadge(reputation);
        return res.status(200).json({ reputation, badge });

      case 'get-stats':
        const stats = getAlertStats();
        return res.status(200).json({ stats });

      case 'get-regional-alerts':
        const regionalAlerts = getRegionalAlerts(data.region);
        return res.status(200).json({ message: regionalAlerts });

      case 'get-ranking':
        const ranking = getRanking(data.limit || 10);
        return res.status(200).json({ message: ranking });

      case 'get-security-tip':
        const tip = getSecurityTip();
        return res.status(200).json({ message: tip });

      case 'get-weather':
        const weather = await getWeatherAlert(data.region);
        return res.status(200).json({ message: weather });

      case 'get-alert-history':
        const history = getUserAlertHistory(chatId, data.limit || 5);
        return res.status(200).json({ message: history });

      case 'search-alerts':
        const searchResults = searchAlerts(data.keyword);
        return res.status(200).json({ message: searchResults });

      default:
        return res.status(400).json({ error: 'Ação não reconhecida' });
    }
  } catch (error) {
    console.error('Erro em bot-functions:', error);
    return res.status(500).json({ error: 'Erro ao processar requisição' });
  }
}
