// Banco com 11 perguntas (10 da partida + 1 reserva para a ajuda "Pular")
// Substitua pelos conteúdos da sua disciplina, mantendo a dificuldade crescente
const bancoPerguntas = [
    {
      nivel: "Fácil",
      pergunta: "1. Qual é o maior planeta do Sistema Solar?",
      alternativas: ["Terra", "Marte", "Júpiter", "Saturno"],
      correta: 2,
      dica: "É um gigante gasoso famoso pela Grande Mancha Vermelha.",
      explicacao: "Júpiter é o maior planeta do Sistema Solar, com massa superior à de todos os outros planetas juntos."
    },
    {
      nivel: "Fácil",
      pergunta: "2. Qual gás é essencial para a respiração humana?",
      alternativas: ["Gás Carbônico", "Oxigênio", "Hélio", "Nitrogênio"],
      correta: 1,
      dica: "Representa cerca de 21% da atmosfera terrestre.",
      explicacao: "O oxigênio (O2) é utilizado pelas células na respiração celular para gerar energia."
    },
    {
      nivel: "Fácil",
      pergunta: "3. Em que continente fica o Brasil?",
      alternativas: ["América do Norte", "Europa", "América do Sul", "África"],
      correta: 2,
      dica: "É o maior país dessa porção continental.",
      explicacao: "O Brasil está localizado na América do Sul e faz fronteira com quase todos os países desse subcontinente."
    },
    {
      nivel: "Médio",
      pergunta: "4. Qual organela celular é responsável pela fotossíntese?",
      alternativas: ["Mitocôndria", "Ribossomo", "Cloroplasto", "Lisossomo"],
      correta: 2,
      dica: "Contém o pigmento verde chamado clorofila.",
      explicacao: "Os cloroplastos captam a luz solar para converter água e gás carbônico em glicose e oxigênio."
    },
    {
      nivel: "Médio",
      pergunta: "5. Em que ano ocorreu a Proclamação da República no Brasil?",
      alternativas: ["1822", "1888", "1889", "1930"],
      correta: 2,
      dica: "Aconteceu um ano após a abolição da escravatura.",
      explicacao: "A Proclamação da República ocorreu em 15 de novembro de 1889, liderada pelo Marechal Deodoro da Fonseca."
    },
    {
      nivel: "Médio",
      pergunta: "6. Qual é o resultado da expressão 3 + 4 x 2?",
      alternativas: ["14", "11", "10", "9"],
      correta: 1,
      dica: "Resolva primeiro a multiplicação antes da soma.",
      explicacao: "Pela ordem das operações matemáticas, calcula-se 4 x 2 = 8 e depois 3 + 8 = 11."
    },
    {
      nivel: "Médio",
      pergunta: "7. Qual é o símbolo químico do elemento Ouro na Tabela Periódica?",
      alternativas: ["Ou", "Ag", "Au", "Fe"],
      correta: 2,
      dica: "Vem do termo em latim 'Aurum'.",
      explicacao: "O símbolo Au deriva do latim Aurum, enquanto Ag representa a prata (Argentum)."
    },
    {
      nivel: "Difícil",
      pergunta: "8. Qual tratado dividiu as terras recém-descobertas entre Portugal e Espanha em 1494?",
      alternativas: ["Tratado de Madri", "Tratado de Tordesilhas", "Tratado de Utrecht", "Tratado de Petrópolis"],
      correta: 1,
      dica: "Recebeu o nome da cidade espanhola onde foi assinado.",
      explicacao: "O Tratado de Tordesilhas estabeleceu um meridiano a 370 léguas a oeste de Cabo Verde."
    },
    {
      nivel: "Difícil",
      pergunta: "9. Qual figura de linguagem ocorre em 'O vento beijava as folhas'?",
      alternativas: ["Metáfora", "Hipérbole", "Personificação", "Ironia"],
      correta: 2,
      dica: "Atribui uma ação humana a um ser inanimado.",
      explicacao: "A personificação (ou prosopopeia) atribui características ou ações humanas a elementos da natureza."
    },
    {
      nivel: "Difícil",
      pergunta: "10. Qual físico formulou a Teoria da Relatividade Geral?",
      alternativas: ["Isaac Newton", "Galileu Galilei", "Albert Einstein", "Nikola Tesla"],
      correta: 2,
      dica: "Publicou essa teoria em 1915.",
      explicacao: "Albert Einstein publicou a Relatividade Geral em 1915, descrevendo a gravidade como curvatura do espaço-tempo."
    },
    {
      nivel: "Reserva",
      pergunta: "Extra: Qual é a capital do estado do Paraná?",
      alternativas: ["Londrina", "Maringá", "Curitiba", "Cascavel"],
      correta: 2,
      dica: "É conhecida pelo Jardim Botânico e pelo transporte integrado.",
      explicacao: "Curitiba é a capital administrativa do estado do Paraná."
    }
  ];
  
  const tabelaPremios = [
    1000, 5000, 10000, 25000, 50000,
    100000, 200000, 350000, 500000, 1000000
  ];
  
  let nomeJogador = "";
  let indiceAtual = 0;
  let acertos = 0;
  let premioAtual = 0;
  let perguntasPartida = [];
  
  // Elementos DOM
  const telaInicio = document.getElementById("tela-inicio");
  const telaJogo = document.getElementById("tela-jogo");
  const telaFinal = document.getElementById("tela-final");
  
  document.getElementById("btn-iniciar").addEventListener("click", iniciarJogo);
  document.getElementById("btn-proxima").addEventListener("click", avancarPergunta);
  document.getElementById("btn-reiniciar").addEventListener("click", reiniciarJogo);
  
  document.getElementById("ajuda-eliminar").addEventListener("click", usarEliminar);
  document.getElementById("ajuda-dica").addEventListener("click", usarDica);
  document.getElementById("ajuda-pular").addEventListener("click", usarPular);
  
  function iniciarJogo() {
    const inputNome = document.getElementById("nome-jogador").value.trim();
    const erroNome = document.getElementById("erro-nome");
  
    if (!inputNome) {
      erroNome.textContent = "Por favor, digite seu nome antes de iniciar.";
      return;
    }
  
    erroNome.textContent = "";
    nomeJogador = inputNome;
    indiceAtual = 0;
    acertos = 0;
    premioAtual = 0;
    perguntasPartida = bancoPerguntas.slice(0, 10);
  
    // Resetar botões de ajuda
    document.getElementById("ajuda-eliminar").disabled = false;
    document.getElementById("ajuda-dica").disabled = false;
    document.getElementById("ajuda-pular").disabled = false;
  
    trocarTela(telaJogo);
    carregarPergunta();
  }
  
  function carregarPergunta() {
    const q = perguntasPartida[indiceAtual];
    document.getElementById("info-jogador").textContent = `Jogador: ${nomeJogador}`;
    document.getElementById("info-progresso").textContent = `Pergunta ${indiceAtual + 1}/10`;
    document.getElementById("info-premio").textContent = `Prêmio: R$ ${premioAtual.toLocaleString("pt-BR")}`;
    document.getElementById("info-nivel").textContent = `Nível: ${q.nivel}`;
    document.getElementById("texto-pergunta").textContent = q.pergunta;
  
    const dicaBox = document.getElementById("texto-dica");
    dicaBox.textContent = "";
    dicaBox.classList.add("oculto");
  
    const feedback = document.getElementById("feedback-container");
    feedback.classList.add("oculto");
  
    const containerAlt = document.getElementById("alternativas-container");
    containerAlt.innerHTML = "";
  
    q.alternativas.forEach((alt, index) => {
      const btn = document.createElement("button");
      btn.className = "btn-alternativa";
      btn.textContent = `${String.fromCharCode(65 + index)}) ${alt}`;
      btn.dataset.index = index;
      btn.addEventListener("click", () => verificarResposta(index, btn));
      containerAlt.appendChild(btn);
    });
  }
  
  function verificarResposta(indiceEscolhido, botaoClicado) {
    const q = perguntasPartida[indiceAtual];
    const botoes = document.querySelectorAll(".btn-alternativa");
    botoes.forEach(b => b.disabled = true);
  
    const feedbackStatus = document.getElementById("feedback-status");
    const feedbackExplicacao = document.getElementById("feedback-explicacao");
  
    if (indiceEscolhido === q.correta) {
      botaoClicado.classList.add("correta");
      acertos++;
      premioAtual = tabelaPremios[indiceAtual];
      feedbackStatus.textContent = "Resposta Correta!";
      feedbackStatus.style.color = "#2ecc71";
    } else {
      botaoClicado.classList.add("errada");
      botoes[q.correta].classList.add("correta");
      feedbackStatus.textContent = "Resposta Incorreta!";
      feedbackStatus.style.color = "#ff6b6b";
    }
  
    document.getElementById("info-premio").textContent = `Prêmio: R$ ${premioAtual.toLocaleString("pt-BR")}`;
    feedbackExplicacao.textContent = `Explicação: ${q.explicacao}`;
    document.getElementById("feedback-container").classList.remove("oculto");
  }
  
  function avancarPergunta() {
    indiceAtual++;
    if (indiceAtual < perguntasPartida.length) {
      carregarPergunta();
    } else {
      finalizarJogo();
    }
  }
  
  function usarEliminar() {
    const q = perguntasPartida[indiceAtual];
    const botoes = Array.from(document.querySelectorAll(".btn-alternativa"));
    let eliminadas = 0;
  
    for (let i = 0; i < botoes.length; i++) {
      if (i !== q.correta && eliminadas < 2) {
        botoes[i].classList.add("eliminada");
        botoes[i].disabled = true;
        eliminadas++;
      }
    }
    document.getElementById("ajuda-eliminar").disabled = true;
  }
  
  function usarDica() {
    const q = perguntasPartida[indiceAtual];
    const dicaBox = document.getElementById("texto-dica");
    dicaBox.textContent = `Dica: ${q.dica}`;
    dicaBox.classList.remove("oculto");
    document.getElementById("ajuda-dica").disabled = true;
  }
  
  function usarPular() {
    perguntasPartida[indiceAtual] = bancoPerguntas[10];
    document.getElementById("ajuda-pular").disabled = true;
    carregarPergunta();
  }
  
  function finalizarJogo() {
    trocarTela(telaFinal);
    document.getElementById("resumo-jogador").textContent = `Parabéns pela partida, ${nomeJogador}!`;
    document.getElementById("resumo-acertos").textContent = `Você acertou ${acertos} de 10 perguntas.`;
    document.getElementById("resumo-premio").textContent = `Premiação Acumulada: R$ ${premioAtual.toLocaleString("pt-BR")}`;
  }
  
  function reiniciarJogo() {
    trocarTela(telaInicio);
  }
  
  function trocarTela(telaDestino) {
    [telaInicio, telaJogo, telaFinal].forEach(t => t.classList.remove("ativa"));
    telaDestino.classList.add("ativa");
  }
 