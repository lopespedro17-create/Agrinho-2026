/* ========================================
   AGRINHO 2026 - JAVASCRIPT
   ======================================== */

// Estado Global
const app = {
    darkMode: localStorage.getItem('darkMode') === 'true',
    quizScore: 0,
    currentQuestion: 0,
    quizAnswers: [],
    soundEnabled: localStorage.getItem('soundEnabled') !== 'false'
};

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initNavigation();
    initQuiz();
    initAnimations();
    initCounters();
});

// ========================================
// MODO ESCURO
// ========================================

function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Aplicar modo escuro salvo
    if (app.darkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    app.darkMode = !app.darkMode;
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = app.darkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', app.darkMode);
}

// ========================================
// NAVEGAÇÃO
// ========================================

function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('ativo');
        menuToggle.classList.toggle('ativo');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('ativo');
            menuToggle.classList.remove('ativo');
        });
    });
    
    // Fechar menu ao scroll
    window.addEventListener('scroll', () => {
        if (navMenu.classList.contains('ativo')) {
            navMenu.classList.remove('ativo');
            menuToggle.classList.remove('ativo');
        }
    });
}

// ========================================
// QUIZ INTERATIVO
// ========================================

const quizData = [
    {
        pergunta: "Qual é o principal desafio ambiental da agricultura convencional?",
        opcoes: [
            "Desperdício de água e uso excessivo de agroquímicos",
            "Falta de tecnologia nas fazendas",
            "Preço alto dos produtos",
            "Falta de mão de obra"
        ],
        correta: 0
    },
    {
        pergunta: "Quanto de água doce é consumida pela agricultura globalmente?",
        opcoes: [
            "30%",
            "50%",
            "70%",
            "90%"
        ],
        correta: 2
    },
    {
        pergunta: "Qual tecnologia pode reduzir o desperdício de água em até 60%?",
        opcoes: [
            "Drones agrícolas",
            "Irrigação inteligente com sensores IoT",
            "Fertilizantes premium",
            "Máquinas colheitadeiras"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é o benefício principal da agrofloresta?",
        opcoes: [
            "Reduzir custos de produção",
            "Aumentar a biodiversidade e sequestrar carbono",
            "Facilitar a mecanização",
            "Aumentar o uso de agroquímicos"
        ],
        correta: 1
    },
    {
        pergunta: "Como drones ajudam na agricultura sustentável?",
        opcoes: [
            "Apenas entregam produtos",
            "Monitoram pragas e reduzem agroquímicos em até 70%",
            "Plantam sementes manualmente",
            "Não têm utilidade"
        ],
        correta: 1
    }
];

function initQuiz() {
    loadQuestion();
    setupQuizButtons();
}

function loadQuestion() {
    const currentQ = quizData[app.currentQuestion];
    const quizContent = document.getElementById('quizContent');
    
    // Atualizar barra de progresso
    const progress = ((app.currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Conteúdo da pergunta
    let html = `
        <h3 class="quiz-question">${currentQ.pergunta}</h3>
        <div class="quiz-options" id="optionsContainer">
    `;
    
    currentQ.opcoes.forEach((opcao, index) => {
        html += `
            <div class="quiz-option" onclick="selectAnswer(${index})">
                ${opcao}
            </div>
        `;
    });
    
    html += '</div>';
    quizContent.innerHTML = html;
}

function selectAnswer(index) {
    const currentQ = quizData[app.currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    // Marcar resposta
    if (app.quizAnswers[app.currentQuestion] === undefined) {
        app.quizAnswers[app.currentQuestion] = index;
        
        // Mostrar resultado
        if (index === currentQ.correta) {
            options[index].classList.add('correto');
            app.quizScore += 20; // 5 perguntas, 20 pontos cada
            playSound();
        } else {
            options[index].classList.add('incorreto');
            options[currentQ.correta].classList.add('correto');
        }
        
        // Desabilitar cliques
        options.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        // Atualizar pontuação
        updateScoreDisplay();
    }
}

function setupQuizButtons() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
}

function nextQuestion() {
    if (app.currentQuestion < quizData.length - 1) {
        app.currentQuestion++;
        loadQuestion();
        updateButtonStates();
    } else {
        showQuizResult();
    }
}

function prevQuestion() {
    if (app.currentQuestion > 0) {
        app.currentQuestion--;
        loadQuestion();
        updateButtonStates();
    }
}

function updateButtonStates() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    prevBtn.disabled = app.currentQuestion === 0;
    nextBtn.textContent = app.currentQuestion === quizData.length - 1 ? 'Finalizar' : 'Próxima →';
}

function updateScoreDisplay() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = app.quizScore;
}

function showQuizResult() {
    const quizCard = document.getElementById('quizCard');
    const quizResultado = document.getElementById('quizResultado');
    
    quizCard.style.display = 'none';
    quizResultado.style.display = 'block';
    
    let titulo, texto;
    
    if (app.quizScore >= 80) {
        titulo = 'Excelente! 🌟';
        texto = 'Você é um especialista em agricultura sustentável!';
    } else if (app.quizScore >= 60) {
        titulo = 'Bom trabalho! 👍';
        texto = 'Você tem conhecimento sólido sobre sustentabilidade.';
    } else if (app.quizScore >= 40) {
        titulo = 'Pode melhorar! 📚';
        texto = 'Continue aprendendo sobre agricultura sustentável.';
    } else {
        titulo = 'Continue tentando! 💪';
        texto = 'Estude mais sobre o tema e refaça o quiz.';
    }
    
    document.getElementById('resultadoTitulo').textContent = titulo;
    document.getElementById('resultadoTexto').textContent = texto;
    document.getElementById('resultadoScore').textContent = `Pontuação: ${app.quizScore}/100`;
}

function reiniciarQuiz() {
    app.quizScore = 0;
    app.currentQuestion = 0;
    app.quizAnswers = [];
    
    document.getElementById('quizCard').style.display = 'block';
    document.getElementById('quizResultado').style.display = 'none';
    document.getElementById('score').textContent = '0';
    
    loadQuestion();
    updateButtonStates();
}

// ========================================
// ANIMAÇÕES
// ========================================

function initAnimations() {
    // Animar barras de impacto
    const impactBars = document.querySelectorAll('.impact-fill');
    impactBars.forEach(bar => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percent = entry.target.getAttribute('data-percent');
                    entry.target.style.width = percent + '%';
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(bar);
    });
    
    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const parallaxElements = document.querySelectorAll('.animated-background');
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    });
}

// ========================================
// CONTADORES ANIMADOS
// ========================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// SOM
// ========================================

function playSound() {
    if (!app.soundEnabled) return;
    
    // Usar Web Audio API para criar um som simples
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// ========================================
// SCROLL SMOOTH
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// EFEITOS DE HOVER NOS BOTÕES
// ========================================

const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.getAttribute('data-sound') === 'click') {
            playSound();
        }
        
        // Efeito ripple
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========================================
// OBSERVADOR DE INTERSECÇÃO PARA ANIMAÇÕES
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .solucao-card, .galeria-item, .stat-card').forEach(element => {
    observer.observe(element);
});

// ========================================
// FUNCIONALIDADES EXTRAS
// ========================================

// Botão voltar ao topo
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        // Mostrar botão se existir
        const btn = document.querySelector('.scroll-top');
        if (btn) btn.style.display = 'block';
    }
});

// Mensagens de feedback
function showFeedback(message, type = 'success') {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#52b788' : '#d62828'};
        color: white;
        border-radius: 5px;
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideInLeft 0.3s ease-out';
        setTimeout(() => feedback.remove(), 300);
    }, 3000);
}

// Evento para botão CTA
const ctaButton = document.getElementById('ctaButton');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        showFeedback('Obrigado pelo interesse em agricultura sustentável! 🌱');
    });
}

console.log('🌱 Agrinho 2026 - Agro Forte, Futuro Sustentável!');