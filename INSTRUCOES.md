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

### 🎮 Gamificação
✅ **BadgeShop** - Loja de insígnias com 5 categorias (Latão, Bronze, Prata, Ouro, Platina)
✅ **LearningPath** - Trilhas de aprendizado para 6 matérias diferentes
✅ **BattleQuiz** - Sistema de batalha com quiz integrado aos tópicos
✅ **Sistema de Gemas** - Ganhe gemas nas batalhas e compre badges
✅ **Navegação Completa** - Entre trilhas, batalhas, loja e perfil

### 🤖 Inteligência Artificial (IA)
✅ **ChatAssistant com IA** - Assistente educacional com integração LLM
✅ **Geração de Quiz por IA** - Quizzes personalizados usando Google Gemini/OpenAI
✅ **Processamento de Arquivos** - Análise de PDFs e documentos para criar conteúdo
✅ **Markdown Renderer** - Renderização rica de respostas formatadas
✅ **Serviços LLM** - Suporte para múltiplos modelos (Gemini, OpenAI, Ollama)

## Estrutura Atualizada

```
devsdeimpacto/
├── .env.example               # ⭐ Template de configuração de API keys
├── src/
│   ├── components/
│   │   ├── BadgeShop.tsx                ⭐ NOVO - Loja de insígnias
│   │   ├── LearningPath.tsx             ⭐ NOVO - Trilhas de aprendizado
│   │   ├── ChatAssistant.tsx            🔄 MELHORADO - Com IA
│   │   ├── MarkdownRenderer.tsx         ⭐ NOVO - Renderização MD
│   │   ├── BattleQuiz.tsx               🔄 Atualizado
│   │   ├── ProfilePage.tsx              🔄 Com badges da loja
│   │   └── StudentDashboard.tsx         🔄 Botão gems clicável
│   ├── data/
│   │   └── topicQuestions.ts            ⭐ NOVO - 200+ questões
│   ├── services/
│   │   ├── llmService.ts                ⭐ NOVO - Integração LLM
│   │   ├── quizService.ts               ⭐ NOVO - Geração de quiz IA
│   │   ├── fileProcessor.ts             ⭐ NOVO - Processamento docs
│   │   └── configCheck.ts               ⭐ NOVO - Diagnósticos
│   ├── types/
│   │   ├── assistant.ts                 ⭐ NOVO - Tipos do chat IA
│   │   └── quiz.ts                      ⭐ NOVO - Tipos de quiz
│   ├── examples/
│   │   ├── openaiIntegration.ts         ⭐ NOVO - Exemplos OpenAI
│   │   └── quizGenerationReal.ts        ⭐ NOVO - Exemplos quiz IA
│   └── styles/
│       └── markdown.css                 ⭐ NOVO - Estilos MD
```

## Configuração de IA (Opcional)

Para usar as funcionalidades de IA, crie um arquivo `.env` na raiz do projeto:

```bash
# Copie o template
cp .env.example .env
```

Edite o `.env` e adicione suas API keys:

```env
# Google Gemini (Recomendado - Gratuito)
VITE_GEMINI_API_KEY=sua_chave_aqui
# Obtenha em: https://makersuite.google.com/app/apikey

# OpenAI (Alternativa)
VITE_OPENAI_API_KEY=sua_chave_aqui
# Obtenha em: https://platform.openai.com/api-keys

# Ollama (Local - Sem custos)
VITE_OLLAMA_URL=http://localhost:11434
# Instale: https://ollama.com
```

**Nota**: O projeto funciona perfeitamente sem configurar IA! As funcionalidades de badges, trilhas e quizzes são totalmente independentes.

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
