// =====================================================
// AGRINHO 2026 - JAVASCRIPT COMPLETO
// Sem frameworks - Puro JavaScript
// =====================================================

// ESTADO GLOBAL
const state = {
    darkMode: localStorage.getItem('darkMode') === 'true',
    soundEnabled: localStorage.getItem('soundEnabled') !== 'false',
    currentQuestion: 0,
    quizScore: 0,
    userAnswers: [],
    isAnimating: false
};

// CONFIGURAÇÃO DE QUIZ
const quizData = [
    {
        question: "Qual é a porcentagem de água consumida pela agricultura globalmente?",
        options: ["40%", "70%", "50%", "90%"],
        correct: 1,
        explanation: "A agricultura consome aproximadamente 70% de toda água doce disponível no planeta."
    },
    {
        question: "Qual é o impacto ambiental mais significativo da agricultura não sustentável?",
        options: ["Poluição de ar", "Perda de biodiversidade", "Aumento do turismo", "Todos acima"],
        correct: 3,
        explanation: "A agricultura não sustentável causa múltiplos danos: perda de biodiversidade, poluição do solo e água, e desmatamento."
    },
    {
        question: "Que tecnologia pode reduzir o desperdício de água em até 60%?",
        options: ["Energia solar", "Irrigação inteligente", "Drones", "IA"],
        correct: 1,
        explanation: "A irrigação inteligente com sensores IoT monitora a umidade do solo e aplica água apenas quando necessário."
    },
    {
        question: "Quanto do desmatamento mundial é causado pela expansão agrícola?",
        options: ["20%", "40%", "80%", "50%"],
        correct: 2,
        explanation: "Aproximadamente 80% do desmatamento global está relacionado à expansão de terras agrícolas."
    },
    {
        question: "Qual prática agrícola regenera o solo naturalmente?",
        options: ["Monocultura intensiva", "Rotação de culturas", "Aplicação contínua de pesticidas", "Exposição ao sol contínua"],
        correct: 1,
        explanation: "A rotação de culturas restaura nutrientes do solo e reduz a necessidade de químicos, promovendo sustentabilidade."
    }
];

// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 Agro Forte 2026 - Inicializando...');
    
    // Aplicar Dark Mode salvo
    if (state.darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Inicializar componentes
    initNavigation();
    initDarkMode();
    initSoundToggle();
    initHeroCanvas();
    initQuiz();
    initCounters();
    initScrollAnimations();
    initGallery();
    initButtonSounds();
    
    console.log('✅ Agro Forte 2026 - Pronto!');
});

// =====================================================
// NAVEGAÇÃO
// =====================================================

function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Fechar menu ao fazer scroll
    window.addEventListener('scroll', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// =====================================================
// DARK MODE
// =====================================================

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    darkModeToggle.addEventListener('click', () => {
        state.darkMode = !state.darkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', state.darkMode);
        
        // Animar o botão
        darkModeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            darkModeToggle.style.transform = 'rotate(0deg)';
        }, 300);
        
        playSound('toggle');
    });
}

// =====================================================
// SOUND
// =====================================================

function initSoundToggle() {
    const soundToggle = document.getElementById('soundToggle');
    
    soundToggle.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        localStorage.setItem('soundEnabled', state.soundEnabled);
        soundToggle.textContent = state.soundEnabled ? '🔊' : '🔇';
        soundToggle.style.opacity = state.soundEnabled ? '1' : '0.5';
    });
}

function playSound(type) {
    if (!state.soundEnabled) return;
    
    // Criar oscilador de som simples
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'toggle':
            oscillator.frequency.value = 600;
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
    }
}

// =====================================================
// CANVAS ANIMADO (HERO)
// =====================================================

function initHeroCanvas() {
    const canvas = document.getElementById('canvas-hero');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Redimensionar canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Partículas animadas
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(45, 156, 94, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animar
    function animate() {
        // Limpar canvas com gradiente
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(232, 245, 233, 0)');
        gradient.addColorStop(1, 'rgba(227, 242, 253, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Atualizar e desenhar partículas
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// =====================================================
// QUIZ INTERATIVA
// =====================================================

function initQuiz() {
    const totalQuestions = document.getElementById('totalQuestions');
    totalQuestions.textContent = quizData.length;
    
    loadQuestion();
    
    // Botões
    document.getElementById('prevBtn').addEventListener('click', prevQuestion);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    
    // Explorar - ir para quiz
    document.querySelector('.explore-btn').addEventListener('click', () => {
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
    });
}

function loadQuestion() {
    const question = quizData[state.currentQuestion];
    const questionText = document.getElementById('questionText');
    const quizOptions = document.getElementById('quizOptions');
    const currentQuestion = document.getElementById('currentQuestion');
    const progressFill = document.getElementById('progressFill');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Atualizar texto da pergunta
    questionText.textContent = question.question;
    currentQuestion.textContent = state.currentQuestion + 1;
    
    // Atualizar barra de progresso
    progressFill.style.width = ((state.currentQuestion + 1) / quizData.length) * 100 + '%';
    
    // Limpar opções antigas
    quizOptions.innerHTML = '';
    
    // Carregar opções
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        
        // Marcar resposta anterior se existir
        if (state.userAnswers[state.currentQuestion] === index) {
            button.classList.add('selected');
        }
        
        quizOptions.appendChild(button);
    });
    
    // Atualizar botões
    prevBtn.disabled = state.currentQuestion === 0;
    
    if (state.currentQuestion === quizData.length - 1) {
        nextBtn.textContent = 'Finalizar Quiz →';
    } else {
        nextBtn.textContent = 'Próxima →';
    }
}

function selectAnswer(index) {
    state.userAnswers[state.currentQuestion] = index;
    
    // Calcular pontuação
    const question = quizData[state.currentQuestion];
    if (index === question.correct) {
        state.quizScore += 20;
    }
    
    // Atualizar visualização
    const options = document.querySelectorAll('.quiz-option');
    options[index].classList.add('selected');
    
    // Mostrar resposta correta
    options[question.correct].classList.add('correct');
    if (index !== question.correct) {
        options[index].classList.add('incorrect');
    }
    
    // Desabilitar cliques
    options.forEach(opt => opt.disabled = true);
    
    playSound('click');
    
    // Auto avanço após 1.5s
    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

function nextQuestion() {
    if (state.currentQuestion < quizData.length - 1) {
        state.currentQuestion++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        loadQuestion();
    }
}

function finishQuiz() {
    // Atualizar score
    document.getElementById('score').textContent = state.quizScore;
    document.getElementById('finalScore').textContent = state.quizScore;
    
    // Mensagem personalizada
    let message = '';
    if (state.quizScore >= 80) {
        message = '🌟 Excelente! Você é um especialista em agricultura sustentável!';
    } else if (state.quizScore >= 60) {
        message = '👍 Bom trabalho! Você compreende bem os conceitos de sustentabilidade.';
    } else if (state.quizScore >= 40) {
        message = '📚 Continue aprendendo sobre agricultura sustentável!';
    } else {
        message = '🌱 Explore mais sobre o tema para melhorar seu conhecimento!';
    }
    
    document.getElementById('resultMessage').textContent = message;
    
    // Mostrar resultado
    const quizResult = document.getElementById('quizResult');
    quizResult.classList.add('visible');
    
    // Adicionar classe hidden à quizContent
    document.querySelector('.quiz-content').classList.add('hidden');
    document.querySelector('.quiz-footer').classList.add('hidden');
}

// =====================================================
// CONTADORES ANIMADOS
// =====================================================

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounter(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    let current = 0;
    const increment = target / 60;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// =====================================================
// SCROLL ANIMATIONS
// =====================================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.problema-card, .solucao-card, .stat-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// =====================================================
// GALERIA MODAL
// =====================================================

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.querySelector('.modal-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Para esta versão, vamos criar uma visualização simples
            const title = item.querySelector('h4').textContent;
            const svg = item.querySelector('.gallery-svg').outerHTML;
            
            modalImage.outerHTML = svg;
            modalCaption.textContent = title;
            modal.classList.add('show');
        });
    });
    
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// =====================================================
// BOTÕES COM SOM
// =====================================================

function initButtonSounds() {
    const buttons = document.querySelectorAll('[data-sound="click"]');
    buttons.forEach(button => {
        button.addEventListener('click', () => playSound('click'));
    });
}

// =====================================================
// FUNÇÕES AUXILIARES
// =====================================================

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animação ao carregar
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});