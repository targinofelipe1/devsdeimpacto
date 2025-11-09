# 🚀 Instruções para Rodar o Projeto

## Pré-requisitos

O projeto necessita do **Node.js** instalado no sistema.

### Instalando o Node.js

1. **Baixe o Node.js**: 
   - Acesse: https://nodejs.org/
   - Baixe a versão LTS (recomendada)
   - Execute o instalador e siga as instruções

2. **Verifique a instalação**:
   - Abra um novo terminal (PowerShell ou CMD)
   - Execute: `node --version`
   - Execute: `npm --version`

## Rodando o Projeto

Após instalar o Node.js, execute os seguintes comandos no terminal:

```powershell
# 1. Navegue até o diretório do projeto
cd c:\Users\intel\Documents\projects\devsdeimpacto

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O projeto abrirá automaticamente no navegador em `http://localhost:5173`

## Credenciais de Teste

Use as seguintes credenciais para testar:

### Aluno
- Email: `aluno@demo.com`
- Senha: qualquer senha

### Professor
- Email: `professor@demo.com`
- Senha: qualquer senha

### Coordenação
- Email: `coordenacao@demo.com`
- Senha: qualquer senha

## Funcionalidades Implementadas

✅ **BadgeShop** - Loja de insígnias com 5 categorias (Latão, Bronze, Prata, Ouro, Platina)
✅ **LearningPath** - Trilhas de aprendizado para 6 matérias diferentes
✅ **BattleQuiz** - Sistema de batalha com quiz integrado aos tópicos
✅ **Sistema de Gemas** - Ganhe gemas nas batalhas e compre badges
✅ **Navegação Completa** - Entre trilhas, batalhas, loja e perfil

## Estrutura Atualizada

```
devsdeimpacto/
├── src/
│   ├── components/
│   │   ├── BadgeShop.tsx ⭐ NOVO
│   │   ├── LearningPath.tsx ⭐ NOVO
│   │   ├── BattleQuiz.tsx (atualizado)
│   │   └── ...
│   ├── data/
│   │   └── topicQuestions.ts ⭐ NOVO (questões para todos os tópicos)
│   └── App.tsx (atualizado)
```

## Problemas Comuns

### "npm não é reconhecido"
- Certifique-se de que o Node.js está instalado
- Reinicie o terminal após a instalação
- Verifique se o Node.js está no PATH do sistema

### Erros de TypeScript
- Execute: `npm install` novamente
- Delete a pasta `node_modules` e execute `npm install`

### Porta já em uso
- O Vite usa a porta 5173 por padrão
- Se estiver ocupada, ele tentará a próxima disponível
