# 🎮 Plataforma Educacional Gamificada para Alunos com TDAH

<div align="center">

![Status](https://img.shields.io/badge/Status-MVP-blue)
![Version](https://img.shields.io/badge/Version-0.1.0-green)
![License](https://img.shields.io/badge/License-Private-red)

Uma plataforma educacional inovadora projetada especificamente para alunos do ensino fundamental 2 (6º ao 9º ano) portadores de TDAH, combinando gamificação, assistência emocional e inteligência artificial.

[✨ Características](#-características-principais) • [🚀 Tecnologias](#-tecnologias-utilizadas) • [📦 Instalação](#-instalação) • [🎯 Funcionalidades](#-funcionalidades-detalhadas) • [🧩 Arquitetura](#-arquitetura)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Características Principais](#-características-principais)
- [Público-Alvo](#-público-alvo)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Funcionalidades Detalhadas](#-funcionalidades-detalhadas)
- [Arquitetura](#-arquitetura)
- [Design System](#-design-system)
- [Integração com IA](#-integração-com-ia)
- [Acessibilidade](#-acessibilidade)
- [Roadmap](#-roadmap)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

A **Plataforma Educacional Gamificada** é um MVP (Minimum Viable Product) desenvolvido para transformar a experiência de aprendizado de alunos com TDAH através de uma abordagem pedagógica inovadora que combina:

- 🎮 **Gamificação**: Sistema de níveis, XP, gemas e badges para aumentar o engajamento
- 🤖 **IA Assistente**: Assistente virtual com diferentes tons adaptados às necessidades emocionais
- 💙 **Suporte Emocional**: Monitoramento e apoio ao bem-estar emocional dos alunos
- 📚 **Trilhas de Aprendizado**: Conteúdo estruturado e progressivo para múltiplas disciplinas
- 🎨 **Design Pixel Art**: Interface visual atraente e amigável com elementos lúdicos

### Contexto e Motivação

Alunos com TDAH (Transtorno do Déficit de Atenção com Hiperatividade) enfrentam desafios únicos no ambiente educacional tradicional. Esta plataforma foi desenvolvida com base em princípios de neurociência e pedagogia especializada para:

- Manter a atenção através de recompensas imediatas e feedback visual
- Dividir conteúdos complexos em blocos menores e gerenciáveis
- Oferecer suporte emocional personalizado
- Permitir personalização sensorial do ambiente de aprendizado
- Promover autonomia e autoestima através de conquistas gamificadas

---

## ✨ Características Principais

### 🎓 Para Alunos

- **Dashboard Personalizado**: Visualização clara de progresso, níveis e conquistas
- **Batalhas de Quiz**: Desafios interativos em 6 disciplinas (Matemática, Português, Ciências, História, Geografia, Inglês)
- **Assistente Virtual com IA**:
  - 📚 Modo Aprendizado: Auxílio com dúvidas e conteúdos
  - 💖 Modo Humor: Suporte emocional e acolhimento
  - ✨ Modo Relaxar: Técnicas de relaxamento e mindfulness
- **Sistema de Recompensas**:
  - XP por atividades completadas
  - Gemas para compra de badges especiais
  - Sistema de níveis com títulos (Coruja Jovem 🐣 → Raposa 🦊 → Tigre 🐯 → Águia 🦅)
- **Loja de Badges**: Conquistas personalizadas para motivação
- **Ranking**: Competição saudável entre colegas
- **Modo Sensorial**: Ajuste de estímulos visuais e sonoros

### 👩‍🏫 Para Professores

- **Dashboard de Gestão**: Visão geral do desempenho da turma
- **Criação de Quizzes**: Ferramenta para criar atividades personalizadas com IA
- **Análise de Progresso**: Métricas detalhadas por aluno e turma
- **Alertas Emocionais**: Notificações sobre alunos que precisam de atenção

### 👨‍💼 Para Coordenação

- **Dashboard Analítico**: Visão macro do desempenho da escola
- **Gestão de Turmas**: Organização de classes e professores
- **Relatórios**: Exportação de dados e análises
- **Sistema de Alertas**: Monitoramento de situações que requerem intervenção

---

## 👥 Público-Alvo

### Primário

- **Alunos**: Estudantes do 6º ao 9º ano (11-14 anos) com diagnóstico de TDAH
- **Professores**: Educadores do ensino fundamental 2
- **Coordenação Pedagógica**: Gestores educacionais

### Secundário

- Famílias dos alunos
- Psicopedagogos e profissionais de apoio
- Instituições de ensino especializadas

---

## 🚀 Tecnologias Utilizadas

### Frontend Core

- **React 18.3.1**: Biblioteca principal para UI
- **TypeScript**: Tipagem estática e melhor DX
- **Vite 6.3.5**: Build tool e dev server ultrarrápido
- **Tailwind CSS**: Estilização utilitária (via `clsx` e `tailwind-merge`)

### UI Components

- **Radix UI**: Primitivos acessíveis e unstyled
  - Accordion, Dialog, Dropdown Menu, Popover, Tabs, etc.
- **Lucide React**: Ícones modernos e consistentes
- **Recharts**: Gráficos e visualizações de dados
- **Embla Carousel**: Carrosséis performáticos

### Processamento de Conteúdo

- **React Markdown**: Renderização de markdown
- **Remark GFM**: GitHub Flavored Markdown
- **Rehype Highlight**: Syntax highlighting para código
- **Highlight.js**: Biblioteca de highlight

### Inteligência Artificial

- **OpenAI SDK 6.8.1**: Integração com GitHub Models
- **GitHub Models**: LLM (GPT-4o-mini) para assistente virtual

### Formulários e Validação

- **React Hook Form 7.55.0**: Gerenciamento de formulários performático
- **Input OTP**: Campos de código de verificação

### Outras Dependências

- **React Day Picker**: Seleção de datas
- **Sonner**: Toast notifications elegantes
- **Vaul**: Drawer component
- **Next Themes**: Gerenciamento de temas (modo sensorial)

---

## 📦 Instalação

### Pré-requisitos

- **Node.js**: versão 20.x ou superior
- **npm**: versão 10.x ou superior
- **Git**: para clonar o repositório

### Passos

1. **Clone o repositório**

   ```bash
   git clone https://github.com/targinofelipe1/devsdeimpacto.git
   cd devsdeimpacto
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente** (veja [Configuração](#-configuração))

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**

   Abra o navegador em: `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados no diretório `dist/`.

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# GitHub Models API (Obrigatório para Assistente Virtual)
VITE_GITHUB_TOKEN=seu_token_github_aqui
```

### Como Obter o GitHub Token

1. Acesse [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Crie um novo token com permissões para `GitHub Models`
3. Copie o token gerado
4. Cole no arquivo `.env`

> ⚠️ **Importante**: Sem o token, o assistente virtual funcionará em modo fallback limitado.

### Contas Demo

Para testar a plataforma, use uma das seguintes credenciais:

**Aluno:**

- Email: `aluno@demo.com`
- Senha: qualquer

**Professor:**

- Email: `professor@demo.com`
- Senha: qualquer

**Coordenação:**

- Email: `coordenacao@demo.com`
- Senha: qualquer

---

## 🎯 Funcionalidades Detalhadas

### 1. Sistema de Gamificação

#### Níveis e Progressão

```
Coruja Jovem 🐣 → Raposa 🦊 → Tigre 🐯 → Águia 🦅
```

- Cada nível requer 500 XP
- XP ganho por: completar quizzes, participar de atividades, engajamento diário

#### Moedas e Recompensas

- **Gemas** 💎: Ganhas através de desempenho em quizzes
- Usadas para comprar badges especiais na loja
- Sistema de economia virtual equilibrado

#### Badges

- Conquistas desbloqueáveis
- Representam habilidades e progresso
- Exibidas no perfil do aluno

### 2. Assistente Virtual com IA

#### Modos de Operação

**📚 Modo Aprendizado**

- Responde dúvidas sobre matérias
- Processa arquivos (PDF, imagens, textos)
- Explica conceitos de forma acessível
- Oferece exercícios e materiais complementares

**💖 Modo Humor**

- Acolhimento emocional
- Check-in de bem-estar com emojis
- Detecta estados emocionais que requerem atenção
- Envia alertas para coordenação quando necessário

**✨ Modo Relaxar**

- Técnicas de respiração guiada
- Sugestões de pausas
- Conteúdo relaxante
- Mindfulness para TDAH

#### Processamento de Arquivos

```typescript
Formatos suportados:
- PDF (até 10MB)
- Imagens (PNG, JPG, até 5MB)
- Texto (TXT, até 2MB)
```

#### Linguagem Adaptada

Todos os prompts do sistema são otimizados para:

- Frases curtas e objetivas
- Vocabulário acessível
- Uso abundante de emojis
- Estrutura visual clara
- Encorajamento constante

### 3. Trilhas de Aprendizado

#### Disciplinas Disponíveis

1. **Matemática** 🔢
   - Multiplicação, Divisão, Frações, Potências, Equações
2. **Português** 📚

   - Substantivos, Verbos, Adjetivos, Pontuação, Interpretação

3. **Ciências** 🔬

   - Células, Sistema Solar, Estados da Matéria, Energia, Ecossistemas

4. **História** 🏛️

   - Descobrimento, Colônia, Independência, República, Brasil Contemporâneo

5. **Geografia** 🌍

   - Continentes, Relevo, Clima, Recursos Naturais, Urbanização

6. **Inglês** 🌐
   - Colors & Numbers, Animals, Daily Routines, Family, Grammar

#### Sistema de Desbloqueio

- Tópicos bloqueados até completar os anteriores
- Sistema de estrelas (⭐⭐⭐) por desempenho
- Possibilidade de revisar conteúdos já completados

### 4. Batalhas de Quiz

#### Características

- 10 perguntas por batalha
- Múltipla escolha (4 alternativas)
- Timer visual de 30 segundos
- Feedback imediato (certo/errado)
- Explicação detalhada após cada resposta
- Recompensas baseadas em desempenho

#### Sistema de Pontuação

```
Acertos | Gemas | Feedback
--------|-------|----------
9-10    | 50    | Incrível! 🌟
7-8     | 30    | Muito bom! ⭐
5-6     | 20    | Bom trabalho! ✨
<5      | 10    | Continue tentando! 💪
```

### 5. Dashboard do Professor

#### Criação de Quizzes com IA

- Interface intuitiva com formulário
- Geração automática via LLM
- Personalização de:
  - Disciplina
  - Tópico
  - Nível de dificuldade
  - Número de questões

#### Monitoramento

- Progresso individual de alunos
- Desempenho por disciplina
- Alertas emocionais
- Histórico de atividades

### 6. Suporte Emocional

#### Check-in Emocional

Emojis disponíveis:

- 😊 Feliz
- 😌 Calmo
- 😐 Neutro
- 😟 Preocupado
- 😢 Triste
- 😰 Ansioso
- 😤 Irritado
- 😫 Cansado

#### Sistema de Alertas

Estados que acionam notificação para coordenação:

- Ansioso, Triste, Irritado, Cansado (recorrência)
- Padrões de baixo engajamento
- Queda brusca de desempenho

### 7. Modo Sensorial

#### Ajustes Disponíveis

- Redução de animações
- Ajuste de contraste
- Simplificação visual
- Foco em conteúdo essencial

---

## 🧩 Arquitetura

### Estrutura de Pastas

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes de UI (Radix + custom)
│   ├── modals/          # Modais da aplicação
│   ├── figma/           # Componentes do design Figma
│   ├── AvatarCustomizer.tsx
│   ├── BadgeShop.tsx
│   ├── BattleQuiz.tsx
│   ├── ChatAssistant.tsx
│   ├── EmotionalAssistant.tsx
│   ├── HomePage.tsx
│   ├── LearningPath.tsx
│   ├── LoginPage.tsx
│   ├── ProfilePage.tsx
│   ├── RankingPage.tsx
│   ├── StudentDashboard.tsx
│   ├── TeacherDashboard.tsx
│   └── CoordinationDashboard.tsx
│
├── data/                # Dados estáticos
│   └── topicQuestions.ts
│
├── services/            # Lógica de negócio
│   ├── llmService.ts           # Integração com GitHub Models
│   ├── quizService.ts          # Geração de quizzes
│   ├── fileProcessor.ts        # Processamento de arquivos
│   └── configCheck.ts          # Verificação de configuração
│
├── types/               # TypeScript interfaces
│   ├── assistant.ts
│   └── quiz.ts
│
├── styles/              # Estilos globais
│   ├── globals.css
│   └── markdown.css
│
├── examples/            # Exemplos de integração
│   ├── openaiIntegration.ts
│   └── quizGenerationReal.ts
│
├── App.tsx              # Componente raiz
├── main.tsx             # Entry point
└── index.css            # Estilos base
```

### Fluxo de Dados

```
User Input → Component → Service → LLM/Data → Component → UI Update
```

### Gerenciamento de Estado

- **Local State**: `useState` para estados de componente
- **Props Drilling**: Para compartilhamento entre componentes próximos
- **Context API**: Planejado para próximas versões

### Tipos TypeScript

#### User

```typescript
interface User {
  id: string;
  name: string;
  nickname?: string;
  avatar: string;
  role: "student" | "teacher" | "coordination";
  level: number;
  xp: number;
  gems: number;
  emotionalState?: string;
  badges?: string[];
}
```

#### Message (Assistente)

```typescript
interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  tone?: ToneType;
  attachment?: FileAttachment;
}
```

#### Quiz

```typescript
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}
```

---

## 🎨 Design System

### Paleta de Cores

#### Cores Primárias

```css
--primary-blue: #3da5c2      /* Matemática, Aprendizado */
--primary-green: #5a9e36     /* Header, Sucesso */
--primary-purple: #9b59b6    /* Ciências */
--primary-yellow: #ffcc33    /* História, Recompensas */
--primary-red: #ff6b6b       /* Alertas, Humor */
```

#### Cores por Disciplina

```css
Matemática:  #3da5c2 → #2d8aa2
Português:   #5a9e36 → #3d7025
Ciências:    #9b59b6 → #8e44ad
História:    #ffcc33 → #ff9933
Geografia:   #16a085 → #138871
Inglês:      #e91e63 → #c2185b
```

### Componentes Visuais

#### Pixel Art Style

- Bordas sólidas de 4px
- Sombras pixelizadas
- Cantos retos (sem border-radius)
- Gradientes direcionais

#### Animações

```css
.float-animation {
  animation: float 3s ease-in-out infinite;
}

.pixel-button {
  transition: transform 0.2s;
}

.pixel-button:hover {
  transform: scale(1.05);
}
```

### Tipografia

```css
Font Stack: System fonts para melhor performance
- -apple-system
- BlinkMacSystemFont
- "Segoe UI"
- "Roboto"
- sans-serif
```

---

## 🤖 Integração com IA

### GitHub Models

#### Configuração

```typescript
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: GITHUB_TOKEN,
  dangerouslyAllowBrowser: true,
});
```

#### Modelo Utilizado

- **GPT-4o-mini**: Modelo otimizado para conversação
- **Temperatura**: 0.7 (equilíbrio criatividade/consistência)
- **Max Tokens**: 1500
- **Top P**: 0.95

#### Prompts Especializados

Cada modo possui um sistema prompt otimizado:

**Aprendizado**: Ensino claro, dividido em blocos pequenos
**Humor**: Acolhimento emocional, validação de sentimentos
**Relaxar**: Linguagem calma, técnicas de relaxamento

### Processamento de Arquivos

#### Pipeline

1. **Upload**: Validação de tipo e tamanho
2. **Leitura**: FileReader API
3. **Extração**:
   - PDF → Texto via library
   - Imagem → Base64 para vision API
   - Texto → Leitura direta
4. **Envio**: Multimodal para GPT-4o-mini
5. **Análise**: Resposta contextualizada

---

## ♿ Acessibilidade

### Princípios WCAG 2.1

- **Perceptível**: Alto contraste, texto claro
- **Operável**: Navegação por teclado completa
- **Compreensível**: Linguagem simples, feedback claro
- **Robusto**: Semântica HTML correta

### Adaptações para TDAH

1. **Fragmentação de Conteúdo**

   - Parágrafos curtos (máx. 3 linhas)
   - Listas em vez de blocos de texto
   - Um conceito por vez

2. **Feedback Visual Imediato**

   - Animações de conquista
   - Cores indicando status
   - Progresso sempre visível

3. **Redução de Sobrecarga Cognitiva**

   - Modo sensorial para menos estímulos
   - Navegação clara e previsível
   - Hierarquia visual forte

4. **Gamificação Motivacional**
   - Recompensas frequentes
   - Desafios apropriados ao nível
   - Celebração de pequenas vitórias

---

## 🗺️ Roadmap

### Versão 1.0 (Q2 2025)

- [ ] Sistema de autenticação real
- [ ] Banco de dados persistente
- [ ] API backend própria
- [ ] Mais disciplinas e tópicos
- [ ] Sistema de conquistas expandido

### Versão 1.5 (Q3 2025)

- [ ] App mobile (React Native)
- [ ] Notificações push
- [ ] Modo offline
- [ ] Relatórios exportáveis (PDF)
- [ ] Integração com sistemas escolares

### Versão 2.0 (Q4 2025)

- [ ] Multiplayer real-time
- [ ] Salas de estudo colaborativas
- [ ] Assistente com voz (TTS/STT)
- [ ] Realidade aumentada para algumas disciplinas
- [ ] Dashboard para pais/responsáveis

### Futuro

- [ ] Machine Learning para personalização
- [ ] Análise preditiva de desempenho
- [ ] Integração com wearables
- [ ] Conteúdo adaptativo por neurociência
- [ ] Plataforma white-label para escolas

---

<div align="center">

**Desenvolvido com 💙 para transformar a educação de crianças com TDAH**

[⬆ Voltar ao topo](#-plataforma-educacional-gamificada-para-alunos-com-tdah)

</div>
