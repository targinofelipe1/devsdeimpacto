export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
}

export const topicQuestions: Record<string, Question[]> = {
  // MATEMÁTICA
  'math-1': [ // Multiplicação Mágica
    {
      question: 'Quanto é 7 × 8?',
      options: ['54', '56', '58', '60'],
      correctAnswer: 1,
      hint: 'Dica: 7 × 8 = 7 × (10 - 2) = 70 - 14'
    },
    {
      question: 'Qual é o resultado de 9 × 6?',
      options: ['52', '54', '56', '58'],
      correctAnswer: 1,
      hint: 'Dica: Pense em 9 × 6 como 10 × 6 - 6'
    },
    {
      question: 'Se você tem 4 caixas com 12 chocolates cada, quantos chocolates tem no total?',
      options: ['44', '46', '48', '50'],
      correctAnswer: 2,
      hint: 'Dica: Multiplique 4 × 12'
    },
    {
      question: 'Quanto é 5 × 11?',
      options: ['50', '55', '60', '65'],
      correctAnswer: 1,
      hint: 'Dica: 5 × 11 = 5 × 10 + 5'
    },
    {
      question: 'Se 8 × 7 = 56, quanto é 7 × 8?',
      options: ['48', '54', '56', '64'],
      correctAnswer: 2,
      hint: 'Dica: Na multiplicação, a ordem não altera o resultado!'
    }
  ],
  
  'math-2': [ // Divisão Dimensional
    {
      question: 'Quanto é 48 ÷ 6?',
      options: ['6', '7', '8', '9'],
      correctAnswer: 2,
      hint: 'Dica: Pense: 6 vezes qual número dá 48?'
    },
    {
      question: 'Se 36 balas são divididas igualmente entre 9 crianças, quantas balas cada uma recebe?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      hint: 'Dica: Divida 36 por 9'
    },
    {
      question: 'Qual é o resultado de 72 ÷ 8?',
      options: ['7', '8', '9', '10'],
      correctAnswer: 2,
      hint: 'Dica: 8 × 9 = 72'
    },
    {
      question: 'Quanto é 100 ÷ 4?',
      options: ['20', '25', '30', '35'],
      correctAnswer: 1,
      hint: 'Dica: 4 × 25 = 100'
    },
    {
      question: 'Se você divide 63 por 7, qual é o resultado?',
      options: ['7', '8', '9', '10'],
      correctAnswer: 2,
      hint: 'Dica: Tabuada do 7!'
    }
  ],

  'math-3': [ // Frações Fantásticas
    {
      question: 'Qual fração representa metade?',
      options: ['1/3', '1/2', '1/4', '2/3'],
      correctAnswer: 1,
      hint: 'Dica: Metade significa dividir em 2 partes iguais'
    },
    {
      question: 'Se você come 2 de 8 fatias de pizza, que fração você comeu?',
      options: ['1/8', '1/4', '2/8', '1/2'],
      correctAnswer: 1,
      hint: 'Dica: 2/8 pode ser simplificado!'
    },
    {
      question: 'Quanto é 1/4 + 1/4?',
      options: ['1/8', '2/8', '1/2', '2/4'],
      correctAnswer: 2,
      hint: 'Dica: Some os numeradores e mantenha o denominador'
    },
    {
      question: 'Qual fração é maior: 1/2 ou 1/4?',
      options: ['1/2', '1/4', 'São iguais', 'Impossível saber'],
      correctAnswer: 0,
      hint: 'Dica: Metade é maior que um quarto'
    },
    {
      question: 'Se 3/4 de uma barra de chocolate tem 9 pedaços, quantos pedaços tem a barra inteira?',
      options: ['10', '11', '12', '13'],
      correctAnswer: 2,
      hint: 'Dica: Se 3 partes = 9, então 1 parte = 3'
    }
  ],

  // PORTUGUÊS
  'port-1': [ // Substantivos Sensacionais
    {
      question: 'Qual palavra é um substantivo?',
      options: ['correr', 'bonito', 'casa', 'rapidamente'],
      correctAnswer: 2,
      hint: 'Dica: Substantivo nomeia seres, lugares ou coisas'
    },
    {
      question: 'Identifique o substantivo próprio:',
      options: ['cidade', 'Rio de Janeiro', 'país', 'lugar'],
      correctAnswer: 1,
      hint: 'Dica: Substantivo próprio começa com letra maiúscula'
    },
    {
      question: 'Qual é o plural de "animal"?',
      options: ['animals', 'animais', 'animales', 'animalz'],
      correctAnswer: 1,
      hint: 'Dica: Palavras terminadas em -al fazem plural em -ais'
    },
    {
      question: '"Felicidade" é um substantivo:',
      options: ['concreto', 'abstrato', 'próprio', 'coletivo'],
      correctAnswer: 1,
      hint: 'Dica: Você pode tocar a felicidade?'
    },
    {
      question: 'Qual palavra representa um coletivo de abelhas?',
      options: ['nuvem', 'rebanho', 'enxame', 'bando'],
      correctAnswer: 2,
      hint: 'Dica: Pense no grupo de abelhas'
    }
  ],

  'port-2': [ // Verbos Vibrantes
    {
      question: 'Qual palavra é um verbo?',
      options: ['feliz', 'estudar', 'alegria', 'rápido'],
      correctAnswer: 1,
      hint: 'Dica: Verbo indica ação, estado ou fenômeno'
    },
    {
      question: 'Em "João corre no parque", o verbo está no:',
      options: ['passado', 'presente', 'futuro', 'infinitivo'],
      correctAnswer: 1,
      hint: 'Dica: A ação está acontecendo agora'
    },
    {
      question: 'Qual é o infinitivo do verbo "cantei"?',
      options: ['canto', 'cantava', 'cantar', 'cantarei'],
      correctAnswer: 2,
      hint: 'Dica: Infinitivo termina em -ar, -er ou -ir'
    },
    {
      question: 'Complete: Eu ____ para a escola todos os dias.',
      options: ['vai', 'vão', 'vou', 'vamos'],
      correctAnswer: 2,
      hint: 'Dica: O verbo deve concordar com "eu"'
    },
    {
      question: 'Qual verbo está conjugado no futuro?',
      options: ['estudei', 'estudo', 'estudava', 'estudarei'],
      correctAnswer: 3,
      hint: 'Dica: Futuro indica algo que ainda vai acontecer'
    }
  ],

  'port-3': [ // Adjetivos Admiráveis
    {
      question: 'Qual palavra é um adjetivo?',
      options: ['mesa', 'correr', 'bonito', 'ali'],
      correctAnswer: 2,
      hint: 'Dica: Adjetivo indica qualidade ou característica'
    },
    {
      question: 'Em "O cachorro grande late", qual é o adjetivo?',
      options: ['cachorro', 'grande', 'late', 'o'],
      correctAnswer: 1,
      hint: 'Dica: Qual palavra descreve o cachorro?'
    },
    {
      question: 'Qual o feminino de "bonito"?',
      options: ['bonita', 'bonitinha', 'boniteza', 'bonitude'],
      correctAnswer: 0,
      hint: 'Dica: Geralmente trocamos -o por -a'
    },
    {
      question: 'Qual o plural de "feliz"?',
      options: ['felizs', 'felizes', 'felizes', 'feliz'],
      correctAnswer: 1,
      hint: 'Dica: Terminados em -z fazem plural em -zes'
    },
    {
      question: 'Identifique o adjetivo: "A noite estava fria e escura"',
      options: ['noite', 'estava', 'fria', 'e'],
      correctAnswer: 2,
      hint: 'Dica: Qual palavra descreve a noite?'
    }
  ],

  // CIÊNCIAS
  'sci-1': [ // Célula: A Unidade da Vida
    {
      question: 'Qual é a menor unidade da vida?',
      options: ['tecido', 'órgão', 'célula', 'sistema'],
      correctAnswer: 2,
      hint: 'Dica: É a menor estrutura que realiza funções vitais'
    },
    {
      question: 'O que protege o conteúdo da célula?',
      options: ['núcleo', 'membrana celular', 'citoplasma', 'vacúolo'],
      correctAnswer: 1,
      hint: 'Dica: É como uma "parede" ao redor da célula'
    },
    {
      question: 'Onde fica o material genético (DNA) da célula?',
      options: ['citoplasma', 'membrana', 'núcleo', 'mitocôndria'],
      correctAnswer: 2,
      hint: 'Dica: É o "centro de comando" da célula'
    },
    {
      question: 'As células vegetais têm o que as células animais não têm?',
      options: ['núcleo', 'parede celular', 'membrana', 'citoplasma'],
      correctAnswer: 1,
      hint: 'Dica: Dá rigidez às plantas'
    },
    {
      question: 'Qual organela é responsável pela respiração celular?',
      options: ['núcleo', 'ribossomo', 'mitocôndria', 'cloroplasto'],
      correctAnswer: 2,
      hint: 'Dica: É a "usina de energia" da célula'
    }
  ],

  'sci-2': [ // Sistema Solar
    {
      question: 'Quantos planetas tem o Sistema Solar?',
      options: ['7', '8', '9', '10'],
      correctAnswer: 1,
      hint: 'Dica: Plutão não é mais considerado planeta!'
    },
    {
      question: 'Qual é o planeta mais próximo do Sol?',
      options: ['Vênus', 'Marte', 'Mercúrio', 'Terra'],
      correctAnswer: 2,
      hint: 'Dica: É o menor planeta rochoso'
    },
    {
      question: 'Qual planeta é conhecido como "planeta vermelho"?',
      options: ['Vênus', 'Marte', 'Júpiter', 'Saturno'],
      correctAnswer: 1,
      hint: 'Dica: Sua cor vem do óxido de ferro no solo'
    },
    {
      question: 'Qual é o maior planeta do Sistema Solar?',
      options: ['Saturno', 'Netuno', 'Júpiter', 'Urano'],
      correctAnswer: 2,
      hint: 'Dica: É um gigante gasoso'
    },
    {
      question: 'Quantos dias a Terra leva para dar uma volta completa ao redor do Sol?',
      options: ['30', '365', '24', '100'],
      correctAnswer: 1,
      hint: 'Dica: Pense em um ano!'
    }
  ],

  // HISTÓRIA
  'hist-1': [ // Descobrimento do Brasil
    {
      question: 'Em que ano o Brasil foi descoberto pelos portugueses?',
      options: ['1492', '1500', '1550', '1600'],
      correctAnswer: 1,
      hint: 'Dica: Quinhentos anos atrás!'
    },
    {
      question: 'Quem comandava a frota que chegou ao Brasil?',
      options: ['Cristóvão Colombo', 'Vasco da Gama', 'Pedro Álvares Cabral', 'Fernando de Magalhães'],
      correctAnswer: 2,
      hint: 'Dica: Seu sobrenome começa com C'
    },
    {
      question: 'Onde os portugueses desembarcaram primeiro no Brasil?',
      options: ['Rio de Janeiro', 'Porto Seguro', 'Salvador', 'São Paulo'],
      correctAnswer: 1,
      hint: 'Dica: Na Bahia'
    },
    {
      question: 'Que nome Cabral deu inicialmente ao Brasil?',
      options: ['Terra Brasilis', 'Ilha de Vera Cruz', 'Terra de Santa Cruz', 'Brasil'],
      correctAnswer: 1,
      hint: 'Dica: Pensaram que era uma ilha!'
    },
    {
      question: 'Quais eram os primeiros habitantes do Brasil?',
      options: ['africanos', 'europeus', 'indígenas', 'asiáticos'],
      correctAnswer: 2,
      hint: 'Dica: Já viviam aqui há milhares de anos'
    }
  ],

  // GEOGRAFIA
  'geo-1': [ // Continentes e Oceanos
    {
      question: 'Quantos continentes existem no planeta Terra?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 1,
      hint: 'Dica: Depende da convenção, mas geralmente são 6!'
    },
    {
      question: 'Qual é o maior continente?',
      options: ['África', 'América', 'Ásia', 'Europa'],
      correctAnswer: 2,
      hint: 'Dica: China e Índia estão nele'
    },
    {
      question: 'Qual é o maior oceano do mundo?',
      options: ['Atlântico', 'Índico', 'Pacífico', 'Ártico'],
      correctAnswer: 2,
      hint: 'Dica: Fica entre a Ásia e as Américas'
    },
    {
      question: 'Em qual continente fica o Brasil?',
      options: ['América do Norte', 'América do Sul', 'América Central', 'África'],
      correctAnswer: 1,
      hint: 'Dica: Na parte sul da América'
    },
    {
      question: 'Qual é o continente mais frio?',
      options: ['Europa', 'Ásia', 'Antártida', 'América do Norte'],
      correctAnswer: 2,
      hint: 'Dica: Está no Polo Sul'
    }
  ],

  'geo-2': [ // Relevo Brasileiro
    {
      question: 'Qual é a forma de relevo mais comum no Brasil?',
      options: ['montanhas', 'planaltos', 'planícies', 'depressões'],
      correctAnswer: 1,
      hint: 'Dica: São áreas elevadas mas planas no topo'
    },
    {
      question: 'Qual é o ponto mais alto do Brasil?',
      options: ['Pico da Neblina', 'Pão de Açúcar', 'Pico das Agulhas Negras', 'Monte Roraima'],
      correctAnswer: 0,
      hint: 'Dica: Fica no Amazonas'
    },
    {
      question: 'A Amazônia é caracterizada principalmente por:',
      options: ['montanhas altas', 'planícies', 'desertos', 'vulcões'],
      correctAnswer: 1,
      hint: 'Dica: Terreno baixo e plano'
    },
    {
      question: 'Qual planície é atravessada pelo Rio Paraguai?',
      options: ['Amazônica', 'do Pantanal', 'Costeira', 'dos Pampas'],
      correctAnswer: 1,
      hint: 'Dica: Uma área alagada famosa'
    },
    {
      question: 'O que são planaltos?',
      options: ['áreas baixas', 'áreas elevadas e planas', 'montanhas pontiagudas', 'vales profundos'],
      correctAnswer: 1,
      hint: 'Dica: Plano + alto'
    }
  ],

  // INGLÊS
  'eng-1': [ // Colors and Numbers
    {
      question: 'What color is the sky?',
      options: ['red', 'blue', 'green', 'yellow'],
      correctAnswer: 1,
      hint: 'Dica: O céu é azul!'
    },
    {
      question: 'How do you say "5" in English?',
      options: ['four', 'five', 'six', 'seven'],
      correctAnswer: 1,
      hint: 'Dica: Vem depois de "four"'
    },
    {
      question: 'What color is a banana?',
      options: ['red', 'blue', 'yellow', 'green'],
      correctAnswer: 2,
      hint: 'Dica: Banana madura é amarela'
    },
    {
      question: 'How many fingers do you have in one hand?',
      options: ['four', 'five', 'six', 'ten'],
      correctAnswer: 1,
      hint: 'Dica: Conte seus dedos!'
    },
    {
      question: 'What number comes after seven?',
      options: ['six', 'seven', 'eight', 'nine'],
      correctAnswer: 2,
      hint: 'Dica: 7, 8, 9...'
    }
  ],

  'eng-2': [ // Animals and Nature
    {
      question: 'What is "cachorro" in English?',
      options: ['cat', 'dog', 'bird', 'fish'],
      correctAnswer: 1,
      hint: 'Dica: Dogs bark!'
    },
    {
      question: 'Complete: A lion is a wild _____',
      options: ['plant', 'animal', 'tree', 'flower'],
      correctAnswer: 1,
      hint: 'Dica: Leão é um...'
    },
    {
      question: 'What is "árvore" in English?',
      options: ['flower', 'tree', 'grass', 'leaf'],
      correctAnswer: 1,
      hint: 'Dica: É grande e tem folhas'
    },
    {
      question: 'Which animal can fly?',
      options: ['dog', 'cat', 'bird', 'fish'],
      correctAnswer: 2,
      hint: 'Dica: Tem asas!'
    },
    {
      question: 'What lives in water?',
      options: ['lion', 'elephant', 'fish', 'monkey'],
      correctAnswer: 2,
      hint: 'Dica: Nada no oceano'
    }
  ]
};
