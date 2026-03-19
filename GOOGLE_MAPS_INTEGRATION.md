# 🗺️ Guia de Integração: Google Maps com Alertas

## 📋 O que é a Integração?

O Google Maps mostra:
- **Mapa interativo** com sua localização
- **Marcadores dos alertas** próximos a você
- **Cores diferentes** para cada tipo de alerta
- **Detalhes ao clicar** em cada alerta
- **Atualização em tempo real** a cada 30 segundos

---

## 🎯 Como Funciona

### Fluxo de Dados

```
App Miuraboy
    ↓
Obtém localização do usuário (GPS)
    ↓
Carrega alertas próximos (API)
    ↓
Google Maps renderiza o mapa
    ↓
Mostra marcadores dos alertas
    ↓
Usuário clica em um alerta
    ↓
Mostra detalhes e opção de abrir no Maps
```

### Cores dos Marcadores

| Tipo | Cor | Significado |
|------|-----|-----------|
| Batida | 🔴 Vermelho | Perigo crítico |
| Buraco | 🟠 Laranja | Cuidado |
| Chuva | 🔵 Azul | Informativo |
| Polícia | 🟣 Roxo | Atenção |
| Acidente | 🟡 Amarelo | Perigo |
| Outro | ⚫ Cinza | Informativo |

---

## 🚀 Passo 1: Criar Chave de API do Google

### 1.1: Acessar Google Cloud Console

1. Acesse: https://console.cloud.google.com
2. Clique em "Selecionar um projeto"
3. Clique em "NOVO PROJETO"

### 1.2: Criar novo projeto

1. Preencha:
   - **Nome do projeto**: `Miuraboy`
   - **ID do projeto**: `miuraboy-maps` (será preenchido automaticamente)

2. Clique em "CRIAR"

3. Aguarde alguns segundos

### 1.3: Ativar Google Maps API

1. No menu lateral, clique em "APIs e Serviços"
2. Clique em "Biblioteca"
3. Procure por: `Maps JavaScript API`
4. Clique em "Maps JavaScript API"
5. Clique em "ATIVAR"

### 1.4: Criar credenciais

1. Clique em "Credenciais" (menu lateral)
2. Clique em "CRIAR CREDENCIAIS"
3. Selecione "Chave de API"
4. Copie a chave gerada

**Exemplo de chave:**
```
AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 1.5: Restringir a chave (Segurança)

1. Clique na chave criada
2. Em "Restrições de aplicativo", selecione "Aplicativos HTTP (sites)"
3. Em "Restrições de API", selecione "Maps JavaScript API"
4. Clique em "SALVAR"

---

## 🔧 Passo 2: Configurar no Vercel

### 2.1: Adicionar variável de ambiente

1. Vá para https://vercel.com/dashboard
2. Clique no projeto `miuraboy`
3. Vá em **Settings** → **Environment Variables**
4. Clique em **Add New**
5. Preencha:
   - **Name**: `VITE_GOOGLE_MAPS_KEY`
   - **Value**: Cole a chave do Google
   - **Environments**: Marque todas

6. Clique em **Save**

### 2.2: Fazer deploy

```bash
git add .
git commit -m "Add Google Maps API key"
git push origin main
```

---

## 📱 Passo 3: Adicionar Componente ao App

### 3.1: Importar o componente

No arquivo `src/App.tsx`:

```tsx
import AlertsMap from './components/AlertsMap'

function App() {
  return (
    <div>
      {/* ... outros componentes ... */}
      
      {/* Adicione em uma seção visível */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Mapa de Alertas</h2>
        <AlertsMap />
      </section>
    </div>
  )
}
```

### 3.2: Fazer deploy

```bash
git add .
git commit -m "Add AlertsMap component"
git push origin main
```

---

## 🎮 Como Usar

### Para Usuários

1. **Abra o app**: https://miuraboy.vercel.app
2. **Vá para "Mapa de Alertas"**
3. **Permita geolocalização** quando solicitado
4. **Veja seu marcador azul** no mapa
5. **Veja os alertas próximos** como marcadores coloridos
6. **Clique em um alerta** para ver detalhes
7. **Clique "Abrir no Maps"** para navegar

---

## 🔍 Funcionalidades Detalhadas

### Localização do Usuário

- Marcador azul mostra sua localização
- Atualiza automaticamente a cada 30 segundos
- Se negar permissão, usa São Paulo como padrão

### Alertas Próximos

- Mostra alertas em um raio de 10 km
- Atualiza a cada 30 segundos
- Mostra até 20 alertas mais recentes

### Interação com Alertas

**Ao clicar em um alerta:**
- Mostra modal com detalhes
- Tipo, severidade, local, descrição
- Coordenadas GPS
- Horário do alerta
- Botão para abrir no Google Maps

### Legenda

- Mostra cores e significados
- Facilita identificação de tipos

---

## 💡 Funcionalidades Avançadas

### Filtrar por Tipo

```tsx
// Adicione em AlertsMap.tsx
const [filterType, setFilterType] = useState<string | null>(null)

const filteredAlerts = filterType 
  ? alerts.filter(a => a.type === filterType)
  : alerts
```

### Filtrar por Severidade

```tsx
const [minSeverity, setMinSeverity] = useState('baixa')

const filteredAlerts = alerts.filter(a => {
  const severityMap = { baixa: 1, media: 2, alta: 3 }
  return severityMap[a.severity] >= severityMap[minSeverity]
})
```

### Raio Customizável

```tsx
const [radius, setRadius] = useState(10) // km

// No fetch de alertas:
body: JSON.stringify({
  action: 'nearby',
  latitude: userLocation.lat,
  longitude: userLocation.lng,
  radius: radius,
})
```

---

## 🚨 Troubleshooting

### ❌ "Mapa não aparece"

**Solução 1: Verificar chave de API**
```bash
# Teste a chave
curl "https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE"
```

**Solução 2: Verificar variável de ambiente**
- Vá para Vercel Settings
- Verifique se `VITE_GOOGLE_MAPS_KEY` está configurada
- Faça novo deploy

**Solução 3: Verificar console do navegador**
- Abra DevTools (F12)
- Vá em "Console"
- Procure por erros

### ❌ "Marcadores não aparecem"

**Solução 1: Verificar geolocalização**
- Permita acesso à localização
- Verifique se o navegador suporta

**Solução 2: Verificar API de alertas**
- Abra DevTools → Network
- Procure por requisição `/api/alerts`
- Verifique se retorna alertas

**Solução 3: Verificar console**
- Procure por erros de JavaScript
- Verifique se a biblioteca Google Maps carregou

### ❌ "Erro 403 Forbidden"

**Causa:** Chave de API não autorizada

**Solução:**
1. Vá para Google Cloud Console
2. Verifique se a chave está restrita corretamente
3. Gere uma nova chave se necessário
4. Atualize no Vercel

### ❌ "Mapa em branco"

**Solução 1: Aguarde carregamento**
- Pode levar alguns segundos

**Solução 2: Recarregue a página**
- Pressione F5

**Solução 3: Limpe cache**
- Pressione Ctrl+Shift+Delete
- Limpe cache e cookies

---

## 📊 Dados Enviados para Google

O Google Maps recebe:

- Sua latitude e longitude
- Latitudes e longitudes dos alertas
- Zoom level
- Tipo de mapa

**Dados NÃO enviados:**
- Seu nome
- Seu telefone
- Descrição dos alertas
- Chat ID do Telegram

---

## 🔐 Segurança

### Boas Práticas

1. **Restringir chave de API**
   - Apenas Maps JavaScript API
   - Apenas aplicativos HTTP

2. **Usar HTTPS**
   - Vercel oferece automaticamente
   - Dados criptografados em trânsito

3. **Não compartilhar chave**
   - Nunca coloque em código público
   - Use variáveis de ambiente

4. **Monitorar uso**
   - Google Cloud Console mostra uso
   - Alerta se limite for atingido

---

## 💰 Custos

### Google Maps JavaScript API

- **Primeiros 28.000 requisições/mês**: Grátis
- **Acima disso**: $7 por 1.000 requisições

### Estimativa para Miuraboy

- 1.000 usuários
- 10 visualizações/dia cada
- = 10.000 requisições/dia
- = 300.000 requisições/mês
- **Custo**: ~$100/mês

**Dica:** Implemente cache para reduzir custos

---

## 🚀 Próximas Melhorias

- [ ] Filtro por tipo de alerta
- [ ] Filtro por severidade
- [ ] Raio customizável
- [ ] Histórico de alertas
- [ ] Heatmap de alertas
- [ ] Rota otimizada
- [ ] Integração com Waze
- [ ] Modo noturno no mapa

---

## 📞 Recursos

- [Google Maps API Docs](https://developers.google.com/maps/documentation/javascript)
- [Google Cloud Console](https://console.cloud.google.com)
- [Pricing](https://cloud.google.com/maps-platform/pricing)
- [Seu App](https://miuraboy.vercel.app)

---

## ✅ Checklist

- [ ] Projeto criado no Google Cloud
- [ ] Maps JavaScript API ativada
- [ ] Chave de API criada
- [ ] Chave restrita (segurança)
- [ ] Chave adicionada no Vercel
- [ ] Componente AlertsMap adicionado
- [ ] App feito deploy
- [ ] Mapa aparecendo
- [ ] Alertas mostrando
- [ ] Clique em alertas funcionando

---

**Seu mapa está pronto! 🗺️✨**
