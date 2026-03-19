# 🚀 Deploy Permanente - Miuraboy

## ✅ Opção Recomendada: Vercel (Gratuito + Permanente)

Vercel é a plataforma oficial para deploy de projetos Vite. Oferece:
- ✅ Domínio permanente (miuraboy.vercel.app)
- ✅ HTTPS automático
- ✅ Deploy automático a cada push no GitHub
- ✅ Gratuito para sempre
- ✅ Performance otimizada globalmente

### Passo 1: Criar Conta no Vercel

1. Acesse: https://vercel.com
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub"
4. Autorize o Vercel a acessar seus repositórios

### Passo 2: Fazer Push do Projeto para GitHub

```bash
# 1. Crie um novo repositório no GitHub
# Acesse: https://github.com/new
# Nome: miuraboy
# Descrição: App PWA de controle financeiro para motoboys

# 2. No seu computador, configure o repositório remoto
cd /home/ubuntu/miuraboy
git remote add origin https://github.com/SEU_USUARIO/miuraboy.git
git branch -M main
git push -u origin main
```

### Passo 3: Deploy no Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique em "Add New..." → "Project"
3. Clique em "Import Git Repository"
4. Selecione seu repositório "miuraboy"
5. Clique em "Import"

**Configurações (deixe como padrão):**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

6. Clique em "Deploy"

**Pronto! 🎉** Seu app estará em: `https://miuraboy.vercel.app`

---

## 🌐 Adicionar Domínio Customizado (Opcional)

Se quiser um domínio próprio como `miuraboy.com.br`:

### Opção 1: Comprar Domínio no Vercel (Mais Fácil)

1. No dashboard Vercel, vá em "Settings" → "Domains"
2. Clique em "Add Domain"
3. Procure por domínios disponíveis (ex: miuraboy.com.br)
4. Compre direto (geralmente R$ 50-100/ano)
5. Vercel configura tudo automaticamente

### Opção 2: Domínio em Outro Registrador (Mais Barato)

Se já tem domínio em outro lugar (Namecheap, GoDaddy, etc):

1. No dashboard Vercel, vá em "Settings" → "Domains"
2. Clique em "Add Domain"
3. Digite seu domínio (ex: miuraboy.com.br)
4. Clique em "Add"
5. Vercel mostrará os registros DNS
6. Configure no seu registrador:
   - Aponte os nameservers para Vercel
   - OU configure os registros A/CNAME manualmente

---

## 📱 PWA Funcionando Perfeitamente

Com o deploy em Vercel (HTTPS), o PWA funcionará 100%:

1. Abra em celular: `https://miuraboy.vercel.app`
2. Clique nos 3 pontinhos
3. Selecione "Adicionar à tela inicial"
4. Ícone aparece na tela inicial
5. Funciona offline com dados salvos localmente

---

## 🔄 Deploy Automático

Depois que estiver no Vercel, qualquer push no GitHub dispara deploy automático:

```bash
# Fazer mudanças no código
git add .
git commit -m "Descrição da mudança"
git push origin main

# Vercel detecta e faz deploy automaticamente
# Em ~1-2 minutos, seu site está atualizado!
```

---

## 📊 Monitorar Performance

No dashboard Vercel você vê:
- ✅ Tempo de build
- ✅ Performance (Lighthouse)
- ✅ Analytics
- ✅ Logs de deploy
- ✅ Histórico de deployments

---

## 🚨 Troubleshooting

### "Build failed"
- Verifique se `npm run build` funciona localmente
- Verifique se todos os imports estão corretos
- Veja os logs no dashboard Vercel

### "PWA não instala"
- Certifique-se de que está em HTTPS (Vercel oferece automaticamente)
- Verifique se manifest.json está sendo servido
- Teste em celular (não desktop)

### "Dados não salvam"
- Verifique localStorage no DevTools
- Teste em modo normal (não incógnito)
- Verifique se há espaço em disco do celular

---

## 💡 Próximos Passos

1. ✅ Deploy em Vercel (você está aqui)
2. 📢 Compartilhe o link com motoboys
3. 📊 Monitore usuários e feedback
4. 🔧 Implemente melhorias baseado em feedback
5. 💰 Monetize (postos pagando, premium, etc)

---

## 📞 Suporte

- **Documentação Vercel**: https://vercel.com/docs
- **Documentação Vite**: https://vitejs.dev
- **PWA**: https://web.dev/progressive-web-apps/

---

**Seu site permanente estará pronto em minutos! 🚀**
