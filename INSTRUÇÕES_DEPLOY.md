# 📋 Instruções de Deploy - Miuraboy

## 🚀 Deploy Rápido (Recomendado)

### Opção 1: Vercel (Gratuito e Fácil)

1. **Crie conta no Vercel**
   - Acesse: https://vercel.com
   - Faça login com GitHub

2. **Conecte seu repositório**
   - Clique em "New Project"
   - Selecione seu repositório do Miuraboy
   - Vercel detectará automaticamente que é um projeto Vite
   - Clique em "Deploy"

3. **Pronto!**
   - Seu app estará em: `https://miuraboy.vercel.app`
   - Atualizações automáticas a cada push no GitHub

### Opção 2: Netlify (Gratuito)

1. **Crie conta no Netlify**
   - Acesse: https://netlify.com
   - Faça login com GitHub

2. **Deploy do repositório**
   - Clique em "Add new site" → "Import an existing project"
   - Selecione seu repositório
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Clique em "Deploy site"

3. **Pronto!**
   - Seu app estará em: `https://seu-site.netlify.app`

### Opção 3: GitHub Pages (Gratuito)

1. **Configure o vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/miuraboy/',
     plugins: [react()],
   })
   ```

2. **Adicione workflow GitHub Actions**
   - Crie arquivo `.github/workflows/deploy.yml`
   - Copie o conteúdo abaixo

3. **Faça push**
   - Seu app estará em: `https://seu-usuario.github.io/miuraboy`

## 🏠 Deploy em Servidor Próprio

### Opção 1: Servidor Linux com Node.js

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/miuraboy.git
cd miuraboy

# 2. Instale dependências
npm install

# 3. Build para produção
npm run build

# 4. Instale PM2 (gerenciador de processos)
npm install -g pm2

# 5. Inicie o servidor
pm2 start "npm run preview" --name "miuraboy"

# 6. Salve configuração
pm2 save
pm2 startup
```

### Opção 2: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
```

Build e execute:
```bash
docker build -t miuraboy .
docker run -p 5173:5173 miuraboy
```

## 🌐 Domínio Customizado

### Para Vercel
1. Acesse Settings do seu projeto
2. Vá em "Domains"
3. Adicione seu domínio (ex: miuraboy.com.br)
4. Configure DNS conforme instruções

### Para Netlify
1. Acesse Site settings
2. Vá em "Domain management"
3. Clique em "Add custom domain"
4. Configure DNS

## 🔒 HTTPS e SSL

- **Vercel**: Automático
- **Netlify**: Automático
- **Servidor próprio**: Use Let's Encrypt (certbot)

```bash
sudo certbot certonly --standalone -d miuraboy.com.br
```

## 📱 PWA Configuration

O app já vem configurado como PWA. Para funcionar perfeitamente:

1. **Certifique-se de que está em HTTPS**
   - PWA requer HTTPS em produção

2. **Teste a instalação**
   - Abra em celular
   - Clique nos 3 pontinhos
   - Selecione "Adicionar à tela inicial"

3. **Monitore no DevTools**
   - Chrome DevTools → Application → Manifest
   - Verifique se manifest.json está carregando
   - Verifique Service Worker

## 🔄 CI/CD Automático

### GitHub Actions (Recomendado)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📊 Monitoramento

### Recomendações:
- **Uptime**: UptimeRobot (grátis)
- **Analytics**: Google Analytics ou Plausible
- **Erros**: Sentry (grátis)
- **Performance**: Lighthouse CI

## 🚨 Troubleshooting

### App não funciona offline
- Verifique se Service Worker está registrado
- Abra DevTools → Application → Service Workers

### PWA não instala
- Certifique-se de que está em HTTPS
- Verifique manifest.json
- Teste em celular (não desktop)

### Dados não salvam
- Verifique localStorage no DevTools
- Teste em modo incógnito (pode estar bloqueado)

## 📞 Suporte

- Documentação Vercel: https://vercel.com/docs
- Documentação Netlify: https://docs.netlify.com
- Documentação PWA: https://web.dev/progressive-web-apps/

---

**Escolha a opção que melhor se encaixa no seu caso!**
