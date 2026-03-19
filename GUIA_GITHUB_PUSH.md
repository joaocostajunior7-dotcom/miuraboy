# 📚 Guia Completo: Push do Miuraboy para GitHub

## Passo 1: Criar Conta no GitHub (Se Não Tiver)

1. Acesse: https://github.com
2. Clique em "Sign up"
3. Preencha:
   - Email
   - Senha
   - Username (ex: seu-usuario)
4. Clique em "Create account"
5. Verifique seu email

**Pronto! Você tem uma conta no GitHub.**

---

## Passo 2: Criar Novo Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha os campos:
   - **Repository name**: `miuraboy` (exatamente assim)
   - **Description**: "App PWA de controle financeiro para motoboys"
   - **Public**: Selecione (para que o Vercel possa acessar)
   - **Initialize this repository**: Deixe desmarcado

3. Clique em "Create repository"

**Você verá uma tela com instruções. Copie o link que aparece, algo como:**
```
https://github.com/SEU_USUARIO/miuraboy.git
```

---

## Passo 3: Fazer Push do Projeto (No seu Computador)

Abra o terminal/prompt de comando e execute os comandos abaixo **na ordem**:

### Se você estiver usando Windows (PowerShell ou CMD):

```bash
# 1. Entre na pasta do projeto
cd C:\caminho\para\miuraboy

# 2. Configure seu email e nome no Git
git config --global user.email "seu-email@gmail.com"
git config --global user.name "Seu Nome"

# 3. Adicione o repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/miuraboy.git

# 4. Renomeie a branch para "main"
git branch -M main

# 5. Faça o push (envie os arquivos)
git push -u origin main
```

### Se você estiver usando Mac ou Linux:

```bash
# 1. Entre na pasta do projeto
cd ~/caminho/para/miuraboy

# 2. Configure seu email e nome no Git
git config --global user.email "seu-email@gmail.com"
git config --global user.name "Seu Nome"

# 3. Adicione o repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/miuraboy.git

# 4. Renomeie a branch para "main"
git branch -M main

# 5. Faça o push (envie os arquivos)
git push -u origin main
```

---

## ⚠️ Quando Executar o Comando `git push`

Na primeira vez, o Git pode pedir sua senha. Você tem 2 opções:

### Opção A: Usar Token de Acesso Pessoal (Recomendado)

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Preencha:
   - **Note**: "Miuraboy Deploy"
   - **Expiration**: "No expiration"
   - **Scopes**: Marque `repo` (acesso completo a repositórios)
4. Clique em "Generate token"
5. **Copie o token** (você não verá novamente!)

Quando o Git pedir senha, **cole o token** (não é a senha do GitHub)

### Opção B: Usar SSH (Mais Seguro, Mas Mais Complexo)

Se preferir, pode configurar SSH depois. Por enquanto, use o token.

---

## Passo 4: Verificar se Funcionou

Depois de executar `git push -u origin main`, você verá algo como:

```
Enumerating objects: 150, done.
Counting objects: 100% (150/150), done.
Delta compression using up to 8 threads
Compressing objects: 100% (120/120), done.
Writing objects: 100% (150/150), 5.23 MiB | 2.50 MiB/s, done.
Total 150 (delta 50), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (50/50), done.
To https://github.com/SEU_USUARIO/miuraboy.git
 * [new branch]      main -> main
Branch 'main' is set up to track remote branch 'main' from 'origin'.
```

**Sucesso! ✅** Seu projeto está no GitHub!

---

## Passo 5: Verificar no GitHub

1. Acesse: https://github.com/SEU_USUARIO/miuraboy
2. Você verá todos os seus arquivos do projeto

**Parabéns! 🎉 Agora você pode fazer o deploy no Vercel!**

---

## Próximo Passo: Deploy no Vercel

Agora que seu projeto está no GitHub, siga estes passos:

1. Acesse: https://vercel.com
2. Clique em "Sign Up" → "Continue with GitHub"
3. Autorize o Vercel
4. Clique em "Add New Project"
5. Selecione o repositório "miuraboy"
6. Clique em "Import"
7. Deixe as configurações padrão
8. Clique em "Deploy"

**Em 1-2 minutos, seu site estará em:**
```
https://miuraboy.vercel.app
```

---

## 🆘 Troubleshooting

### "fatal: not a git repository"
- Você não está na pasta correta
- Execute: `cd /caminho/para/miuraboy`
- Depois tente novamente

### "fatal: remote origin already exists"
- Você já adicionou o repositório remoto
- Execute: `git remote remove origin`
- Depois execute novamente: `git remote add origin https://github.com/SEU_USUARIO/miuraboy.git`

### "Authentication failed"
- Você digitou a senha errada
- Use um **token de acesso pessoal** (não a senha do GitHub)
- Gere um novo token em: https://github.com/settings/tokens

### "Everything up-to-date"
- Significa que não há mudanças para enviar
- Isso é normal na primeira vez se você já fez commit

---

## 📞 Precisa de Ajuda?

Se algo não funcionar:
1. Copie a mensagem de erro exata
2. Procure no Google: "git [mensagem de erro]"
3. Ou me avise qual foi o erro!

---

**Você consegue! 💪 É só seguir os passos acima!**
