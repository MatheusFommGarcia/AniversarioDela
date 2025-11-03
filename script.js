// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  initializePoema()
  initializeButtons()
  const music = document.getElementById("bg-music")
  initializeGames()
})

// Animações de entrada
function initializeAnimations() {
  const header = document.querySelector("header")
  const homeContent = document.querySelector(".home-content")

  header.style.opacity = "0"
  homeContent.style.opacity = "0"

  setTimeout(() => {
    header.style.transition = "opacity 1s ease-in"
    header.style.opacity = "1"
  }, 100)

  setTimeout(() => {
    homeContent.style.transition = "opacity 1s ease-in"
    homeContent.style.opacity = "1"
  }, 500)
}

// Poema com efeito de digitação
const poema = `
Em uma noite
Céu escuro,
Coração vazio,
Estrelas distantes.

Me vi sem rumo,
Sentado no gramado,
Vazio,
Solitário.

Olho para o lado…
O que procuro?
O que sinto?
O que quero da vida?

Quero uma luz —
A luz que me guie,
Que me faça viver.

De repente, vejo você:
Seu jeitinho,
Seus olhos,
Seu sorriso.

Onde estou?
Estou sonhando?

Em meio à escuridão,
Enxergo a luz,
A esperança.
Finalmente,
Agora tenho um rumo,
Um propósito.

Eu morreria por você,
Lutaria por você,
Faria tudo por você.

Loucura? Pode achar.
Mas faria tudo por você,
Pois você me respeitou,
Me amou,
Não me usou,
Me aceitou
Da forma que sou.

Posso não ser rico,
Nem alto,
Nem forte.
Posso não me encaixar nos padrões.
Mas eu tenho algo
Que muitos nunca vão ter:
A felicidade.

O que está acontecendo?
O que estou falando?
Me sinto tonto,
Perdido…
Perdido em você.

Não tenho palavras.
Acho melhor parar.
Por isso amo você. 💖
`

function initializePoema() {
  let i = 0
  const poemElement = document.getElementById("poema-texto")

  function escreverPoema() {
    if (i < poema.length) {
      const char = poema.charAt(i)
      // Mantém quebras de linha visuais
      poemElement.innerHTML += char === "\n" ? "<br>" : char
      i++
      setTimeout(escreverPoema, 50)
    }
  }

  escreverPoema()
}


// Botões principais
function initializeButtons() {
  const musicBtn = document.getElementById("music-btn")
  const gamesBtn = document.getElementById("games-btn")
  const surpresaBtn = document.getElementById("surpresa-btn")
  const music = document.getElementById("bg-music")

  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play()
      musicBtn.classList.add("playing")
    } else {
      music.pause()
      musicBtn.classList.remove("playing")
    }
  })

  gamesBtn.addEventListener("click", openGamesModal)

  surpresaBtn.addEventListener("click", () => {
    const msg = document.getElementById("mensagem")
    if (msg.style.display === "none") {
      msg.style.display = "block"
      msg.style.opacity = "0"
      setTimeout(() => {
        msg.style.transition = "opacity 0.5s"
        msg.style.opacity = "1"
      }, 50)
    }
  })
}

// Modal de Minijogos
function openGamesModal() {
  const modal = document.getElementById("games-modal")
  modal.classList.add("active")

  // Fechar modal com X
  const closeBtn = modal.querySelector(".close-modal")
  closeBtn.onclick = () => modal.classList.remove("active")

  // Fechar ao clicar fora
  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("active")
  }

  // Abrir jogo selecionado
  modal.querySelectorAll(".game-card").forEach((card) => {
    card.onclick = () => {
      const game = card.dataset.game
      modal.classList.remove("active")
      startGame(game)
    }
  })
}

// Fechar qualquer jogo ativo
function closeGame() {
  document.querySelectorAll(".game-container").forEach((game) => {
    game.style.display = "none"
  })
}

// Iniciar jogo específico
function startGame(game) {
  closeGame()
  const gameContainer = document.getElementById(game + "-game")
  gameContainer.style.display = "block"

  // Corrigido: botão “X” agora fecha o jogo corretamente
  const closeButton = gameContainer.querySelector(".btn-close-game")
  if (closeButton) closeButton.onclick = closeGame

  if (game === "memory") initMemoryGame()
  if (game === "quiz") initQuizGame()
  if (game === "click") initClickGame()
}

// ==============================
// Jogo da Memória
// ==============================
let memoryFlipped = []
let memoryMatched = 0

function initMemoryGame() {
  const board = document.querySelector(".memory-board")
  board.innerHTML = ""
  memoryFlipped = []
  memoryMatched = 0

  const pairs = ["💕", "🌹", "💌", "🎉", "✨", "🎈"]
  const cards = [...pairs, ...pairs].sort(() => Math.random() - 0.5)

  cards.forEach((card, index) => {
    const button = document.createElement("button")
    button.className = "memory-card"
    button.innerHTML = "❓"
    button.addEventListener("click", () => flipMemoryCard(button, card, index))
    board.appendChild(button)
  })

  document.querySelector(".memory-score span").textContent = "0"
}

function flipMemoryCard(button, card, index) {
  if (memoryFlipped.length < 2 && !button.classList.contains("flipped")) {
    button.classList.add("flipped")
    button.innerHTML = card
    memoryFlipped.push({ button, card, index })

    if (memoryFlipped.length === 2) setTimeout(checkMemoryMatch, 500)
  }
}

function checkMemoryMatch() {
  const [card1, card2] = memoryFlipped

  if (card1.card === card2.card) {
    memoryMatched++
    document.querySelector(".memory-score span").textContent = memoryMatched
    memoryFlipped = []

    if (memoryMatched === 6) {
      setTimeout(() => alert("Parabéns! Você venceu! 🎉"), 300)
    }
  } else {
    card1.button.classList.remove("flipped")
    card2.button.classList.remove("flipped")
    card1.button.innerHTML = "❓"
    card2.button.innerHTML = "❓"
    memoryFlipped = []
  }
}

// ==============================
// Quiz do Amor
// ==============================
const quizQuestions = [
  {
    question: "Qual é a cor mais bonita?",
    options: ["Vermelho ❤️", "Roxo 💜", "Azul 💙", "Verde 💚"],
    correct: 1,
  },
  {
    question: "Quanto você é especial?",
    options: ["Um pouco", "Médio", "Extremamente demais! 💕", "Nada"],
    correct: 2,
  },
  {
    question: "O que você merece?",
    options: ["Felicidade", "Amor", "Sucesso", "Tudo isso junto!"],
    correct: 3,
  },
]

let currentQuestion = 0
let quizScore = 0

function initQuizGame() {
  currentQuestion = 0
  quizScore = 0
  showQuizQuestion()
}

function showQuizQuestion() {
  if (currentQuestion >= quizQuestions.length) {
    alert(`Quiz finalizado! Você acertou ${quizScore}/${quizQuestions.length}! 🎉`)
    closeGame()
    return
  }

  const question = quizQuestions[currentQuestion]
  document.getElementById("quiz-question").innerHTML = question.question

  const optionsContainer = document.querySelector(".quiz-options")
  optionsContainer.innerHTML = ""

  question.options.forEach((option, index) => {
    const button = document.createElement("button")
    button.className = "quiz-option"
    button.innerHTML = option
    button.addEventListener("click", () => answerQuiz(index, question.correct))
    optionsContainer.appendChild(button)
  })
}

function answerQuiz(selected, correct) {
  const options = document.querySelectorAll(".quiz-option")

  options[selected].classList.add(selected === correct ? "correct" : "wrong")
  options[correct].classList.add("correct")

  if (selected === correct) quizScore++

  setTimeout(() => {
    currentQuestion++
    showQuizQuestion()
  }, 1500)
}

// ==============================
// Clique Rápido
// ==============================
let clickCount = 0
let clickGameActive = false

function initClickGame() {
  clickCount = 0
  clickGameActive = true
  document.getElementById("click-count").innerHTML = "0"
  document.getElementById("click-timer").innerHTML = "30"

  const clickBtn = document.getElementById("clickable-btn")
  clickBtn.classList.remove("finished")
  clickBtn.innerHTML = "Clique!"

  const clickHandler = () => {
    if (clickGameActive) {
      clickCount++
      document.getElementById("click-count").innerHTML = clickCount
    }
  }

  clickBtn.onclick = clickHandler

  let timeLeft = 30
  const timer = setInterval(() => {
    timeLeft--
    document.getElementById("click-timer").innerHTML = timeLeft

    if (timeLeft <= 0) {
      clearInterval(timer)
      clickGameActive = false
      clickBtn.classList.add("finished")
      clickBtn.innerHTML = "⏱️"
      alert(`Tempo acabou! Você fez ${clickCount} cliques! 💪`)
    }
  }, 1000)
}

function initializeGames() {
  // nada extra aqui no momento
}

function initializeButtons() {
  const musicBtn = document.getElementById("music-btn")
  const gamesBtn = document.getElementById("games-btn")
  const surpresaBtn = document.getElementById("surpresa-btn")
  const music = document.getElementById("bg-music")

  // === Controle de Volume ===
  const volumeSlider = document.getElementById("volume-slider")
  const volUp = document.getElementById("vol-up")
  const volDown = document.getElementById("vol-down")

  // Volume inicial
  music.volume = parseFloat(volumeSlider.value)

  // Atualiza o volume conforme o slider
  volumeSlider.addEventListener("input", () => {
    music.volume = parseFloat(volumeSlider.value)
  })

  // Botões + e -
  volUp.addEventListener("click", () => {
    let newVol = Math.min(1, music.volume + 0.1)
    music.volume = newVol
    volumeSlider.value = newVol.toFixed(2)
  })

  volDown.addEventListener("click", () => {
    let newVol = Math.max(0, music.volume - 0.1)
    music.volume = newVol
    volumeSlider.value = newVol.toFixed(2)
  })

  // === Botão de Música ===
  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play()
      musicBtn.classList.add("playing")
    } else {
      music.pause()
      musicBtn.classList.remove("playing")
    }
  })

  // === Botão de Minijogos ===
  gamesBtn.addEventListener("click", openGamesModal)

  // === Botão de Surpresa ===
  surpresaBtn.addEventListener("click", () => {
    const msg = document.getElementById("mensagem")
    if (msg.style.display === "none") {
      msg.style.display = "block"
      msg.style.opacity = "0"
      setTimeout(() => {
        msg.style.transition = "opacity 0.5s"
        msg.style.opacity = "1"
      }, 50)
    }
  })
}
