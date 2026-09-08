/* =========================================================
   टक्कर (Tie Round) - Question Database
   ========================================================= */

const tieQuestions = {
  1: {
    q: "Q- प्रारंभ (PRARAMBH) 2026 अभियान के तहत करदाताओं की सहायता के लिए किस AI-संचालित चैटबॉट का अनावरण किया गया?",
    a: "उत्तर - कर साथी"
  },
  2: {
    q: "आत्मसम्मान आंदोलन (Self Respect Movement) किनके द्वारा चलाया गया?",
    a: "उत्तर - ई वी रामास्वामी पेरियार"
  },
  3: {
    q: "भारत का स्कॉटलैंड किसे कहा जाता है?",
    a: "उत्तर - कूर्ग (Coorg/कोडागु)"
  },
  4: {
    q: "FSB किस देश की खुफिया एजेंसी है?",
    a: "उत्तर - रूस (Russia)"
  }
};

let currentLevel = 1;
const totalQuestions = Object.keys(tieQuestions).length;
const completedLevels = new Set();

const screens = {
  home: document.getElementById("screen-home"),
  levels: document.getElementById("screen-levels"),
  preview: document.getElementById("screen-question-preview"),
  answer: document.getElementById("screen-answer-page")
};

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active");
  });
  screens[screenName].classList.add("active");
}

const grid = document.getElementById("level-grid");

function renderLevels() {
  grid.innerHTML = "";

  for (let level = 1; level <= totalQuestions; level++) {
    const button = document.createElement("button");
    button.className = "level-btn";
    button.textContent = level;
    button.setAttribute("aria-label", `Question ${level}`);

    if (completedLevels.has(level)) {
      button.classList.add("completed");
      button.setAttribute("aria-label", `Question ${level} - visited`);
    }

    button.addEventListener("click", function () {
      completedLevels.add(level);
      button.classList.add("completed");
      openQuestionPreview(level);
    });

    grid.appendChild(button);
  }
}

function openQuestionPreview(level) {
  currentLevel = level;
  const data = tieQuestions[currentLevel];

  if (!data) return;

  document.getElementById("preview-q-text").textContent = data.q;
  showScreen("preview");
}

function openAnswerPage() {
  const data = tieQuestions[currentLevel];

  if (!data) return;

  document.getElementById("answer-q-text").textContent = data.q;
  document.getElementById("answer-card-text").textContent = data.a;
  showScreen("answer");
}

// Event Listeners
document.getElementById("btn-start").addEventListener("click", function () {
  renderLevels();
  showScreen("levels");
});

document.getElementById("btn-show-answer").addEventListener("click", openAnswerPage);
document.getElementById("btn-back-to-home").addEventListener("click", () => showScreen("home"));
document.getElementById("btn-back-to-levels-3").addEventListener("click", () => showScreen("levels"));
document.getElementById("btn-home-from-question").addEventListener("click", () => showScreen("levels"));
document.getElementById("btn-back-to-preview-4").addEventListener("click", () => showScreen("preview"));
document.getElementById("btn-home-from-answer").addEventListener("click", () => showScreen("levels"));

// Initialize
renderLevels();