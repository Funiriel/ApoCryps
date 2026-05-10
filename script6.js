document.addEventListener("DOMContentLoaded", () => {

  // ─── HERO SLIDER ───────────────────────────────────────
  const images = ["image.jpg", "image2.jpg", "image3.png"];
  const slides = document.querySelectorAll(".hero-bg");

  slides.forEach((slide, i) => {
    if (images[i]) slide.style.backgroundImage = `url('${images[i]}')`;
  });

  let index = 0;
  setInterval(() => {
    if (!slides.length) return;
    const current = slides[index];
    const nextIndex = (index + 1) % slides.length;
    const next = slides[nextIndex];

    next.classList.add("active");
    current.classList.remove("active");
    current.classList.add("prev");

    setTimeout(() => current.classList.remove("prev"), 1000);
    index = nextIndex;
  }, 5000);

  // ─── REVEAL ON SCROLL ──────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));


  // ─── CONTACT FORM ──────────────────────────────────────
  const form = document.getElementById("contact-form");
  if (form) {
    const button = form.querySelector("button");

    form.addEventListener("input", () => {
      if (form.checkValidity()) {
        button.classList.add("ready");
      } else {
        button.classList.remove("ready");
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      button.textContent = "✓ Надіслано!";
      button.style.background = "linear-gradient(135deg, #4db87a, #7adba0)";
      setTimeout(() => {
        form.reset();
        button.textContent = "Надіслати повідомлення";
        button.style.background = "";
        button.classList.remove("ready");
      }, 3000);
    });
  }

});

// ─── QUIZ ───────────────────────────────────────────────

(function() {

  const QUESTIONS = [
    {
      q: "Яка середня відстань від Землі до Марсу?",
      options: ["78 млн км", "225 млн км", "400 млн км", "150 млн км"],
      answer: 1,
      fact: "Середня відстань між Землею і Марсом — ~225 млн км, але вона змінюється від 54 до 401 млн км залежно від положення планет."
    },
    {
      q: "Як довго триває марсіанська доба (sol)?",
      options: ["24 год 00 хв", "24 год 37 хв", "23 год 15 хв", "25 год 12 хв"],
      answer: 1,
      fact: "Марсіанська доба (sol) триває 24 години 37 хвилин і 22 секунди — лише трохи довше земної."
    },
    {
      q: "З чого переважно складається атмосфера Марсу?",
      options: ["Азот (N₂)", "Кисень (O₂)", "Вуглекислий газ (CO₂)", "Аргон (Ar)"],
      answer: 2,
      fact: "Атмосфера Марсу складається з ~95% CO₂, ~3% азоту та ~1.6% аргону. Кисню там менше ніж 0.2%."
    },
    {
      q: "Яка найвища гора в Сонячній системі знаходиться на Марсі?",
      options: ["Гора Ейверест", "Олімп (Olympus Mons)", "Аскрійська гора", "Гора Аргір"],
      answer: 1,
      fact: "Olympus Mons — найвища гора Сонячної системи. Висота ~21 км над рівнем планети, діаметр ~600 км."
    },
    {
      q: "Скільки природних супутників має Марс?",
      options: ["0", "1", "2", "4"],
      answer: 2,
      fact: "Марс має два супутники — Фобос і Деймос. Вони мають нерегулярну форму і, ймовірно, є захопленими астероїдами."
    },
    {
      q: "Яка гравітація на поверхні Марсу відносно земної?",
      options: ["~18%", "~38%", "~62%", "~81%"],
      answer: 1,
      fact: "Гравітація на Марсі становить ~3.72 м/с², тобто ~38% від земної. Людина вагою 80 кг важитиме там ~30 кг."
    },
    {
      q: "Який марсохід NASA першим успішно проїхав по поверхні Марсу?",
      options: ["Curiosity", "Perseverance", "Sojourner", "Opportunity"],
      answer: 2,
      fact: "Sojourner — перший успішний марсохід, що працював у 1997 році в рамках місії Mars Pathfinder. Він проїхав ~100 метрів."
    },
    {
      q: "Чому поверхня Марсу має червоний колір?",
      options: ["Мідний пил", "Оксид заліза (іржа)", "Сірчані сполуки", "Перхлорати"],
      answer: 1,
      fact: "Червоний колір Марсу зумовлений оксидом заліза — іржею — у ґрунті та пилу. Частинки пилу потрапляють навіть в атмосферу."
    },
    {
      q: "Де на Марсі виявлено найбільші запаси підповерхневого водяного льоду?",
      options: ["На екваторі", "У полярних шапках", "У каньйоні Валліс Марінерс", "Під вулканами"],
      answer: 1,
      fact: "Великі запаси водяного льоду зосереджені в полярних шапках Марсу, особливо в північній — там під CO₂-кригою є товстий шар H₂O."
    },
    {
      q: "Яка температура вважається типовою на поверхні Марсу біля екватора вдень?",
      options: ["-73°C", "−10°C до +20°C", "+50°C", "−120°C"],
      answer: 1,
      fact: "Вдень біля екватора температура може сягати від -10°C до +20°C. Вночі падає до -80°C і нижче — через тонку атмосферу."
    },
  ];

  const letters = ['A', 'B', 'C', 'D'];
  let current = 0;
  let score = 0;
  let answered = false;

  const startScreen  = document.getElementById('quiz-start');
  const gameScreen   = document.getElementById('quiz-game');
  const resultScreen = document.getElementById('quiz-result');
  const btnStart     = document.getElementById('btn-start');
  const btnNext      = document.getElementById('btn-next');
  const btnRetry     = document.getElementById('btn-retry');

  if (!btnStart) return; // quiz not on this page

  btnStart.addEventListener('click', startQuiz);
  btnNext.addEventListener('click', nextQuestion);
  btnRetry.addEventListener('click', retryQuiz);

  function startQuiz() {
    current = 0; score = 0; answered = false;
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    loadQuestion();
  }

  function loadQuestion() {
    answered = false;
    btnNext.classList.add('hidden');

    const q = QUESTIONS[current];
    const total = QUESTIONS.length;

    document.getElementById('quiz-counter').textContent =
      String(current + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
    document.getElementById('quiz-score-live').textContent = '★ ' + score;
    document.getElementById('quiz-q-num').textContent = 'Питання ' + String(current + 1).padStart(2, '0');
    document.getElementById('quiz-question').textContent = q.q;
    document.getElementById('quiz-progress-bar').style.width = (current / total * 100) + '%';

    const feedback = document.getElementById('quiz-feedback');
    feedback.className = 'quiz-feedback hidden';
    feedback.querySelector('.feedback-text').textContent = '';

    // Animate card in
    const card = document.getElementById('quiz-card');
    card.style.animation = 'none';
    card.offsetHeight; // reflow
    card.style.animation = 'cardIn 0.4s ease forwards';

    // Render options
    const opts = document.getElementById('quiz-options');
    opts.innerHTML = '';
    q.options.forEach((text, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${text}</span>`;
      btn.addEventListener('click', () => selectAnswer(i, btn));
      opts.appendChild(btn);
    });

    // label last question
    document.getElementById('btn-next-label').textContent =
      current === total - 1 ? 'Результат' : 'Далі';
  }

  function selectAnswer(index, btn) {
    if (answered) return;
    answered = true;

    const q = QUESTIONS[current];
    const allOpts = document.querySelectorAll('.quiz-option');
    allOpts.forEach(o => o.classList.add('disabled'));

    const isCorrect = index === q.answer;
    if (isCorrect) score++;

    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    allOpts[q.answer].classList.add('correct');

    // feedback
    const feedback = document.getElementById('quiz-feedback');
    const icon = document.getElementById('feedback-icon');
    const text = document.getElementById('feedback-text');
    feedback.className = 'quiz-feedback ' + (isCorrect ? 'correct-fb' : 'wrong-fb');
    icon.textContent = isCorrect ? '✓' : '✗';
    text.textContent = q.fact;

    btnNext.classList.remove('hidden');
  }

  function nextQuestion() {
    current++;
    if (current >= QUESTIONS.length) {
      showResult();
    } else {
      loadQuestion();
    }
  }

  function showResult() {
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const total = QUESTIONS.length;
    document.getElementById('result-score-svg').textContent = score + '/' + total;

    const pct = score / total;
    let rank, desc;

    if (pct === 1) {
      rank = '🏆 Верховний Командир';
      desc = 'Ідеальний результат! Ти знаєш Марс краще за деяких планетологів. Місія затверджена.';
    } else if (pct >= 0.8) {
      rank = '🚀 Старший Колоніст';
      desc = 'Відмінний результат! Ти готовий до польоту. Кілька деталей ще можна підтягнути.';
    } else if (pct >= 0.6) {
      rank = '🛸 Кандидат у Місію';
      desc = 'Непогані знання, але перед відльотом рекомендуємо додаткове навчання в симуляторі.';
    } else if (pct >= 0.4) {
      rank = '🔬 Стажер Бази';
      desc = 'Базові знання є, але для виживання на Марсі потрібно набагато більше. Продовжуй вчитись.';
    } else {
      rank = '🌍 Залишайся на Землі';
      desc = 'Поки що Марс — не для тебе. Але це тільки перший крок! Спробуй ще раз.';
    }

    document.getElementById('result-rank').textContent = rank;
    document.getElementById('result-desc').textContent = desc;
    document.getElementById('result-title').textContent =
      'Результат: ' + score + ' / ' + total;

    document.getElementById('quiz-progress-bar').style.width = '100%';
    document.getElementById('quiz-score-live').textContent = '★ ' + score;
  }

  function retryQuiz() {
    startQuiz();
  }

  // ─── PARTICLES ──────────────────────────────────────────
  const canvas = document.getElementById('quiz-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.floor(W * H / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.2 + 0.2,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          alpha: Math.random() * 0.6 + 0.2,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,77,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => { resize(); createParticles(); });
    resize();
    createParticles();
    drawParticles();
  }

})();
