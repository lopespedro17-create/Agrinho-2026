// Script JavaScript - Agro Forte, Futuro Sustentável
// Funcionalidades interativas do site

// ========== TEMA ESCURO ==========
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Alternar tema
themeToggle?.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('.theme-icon');
    icon.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Carregar tema salvo
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle?.querySelector('.theme-icon');
        if (icon) icon.textContent = '☀️';
    }
});

// ========== MENU MOBILE ==========
navToggle?.addEventListener('click', function() {
    navMenu?.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
    });
});

// ========== SCROLL SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== BOTÃO SCROLL TO TOP ==========
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn?.classList.add('show');
    } else {
        scrollToTopBtn?.classList.remove('show');
    }
});

scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== QUIZ INTERATIVO ==========
const quizData = [
    {
        pergunta: 'Qual é a porcentagem de água doce usada na agricultura globalmente?',
        opcoes: ['50%', '70%', '40%', '90%'],
        resposta: 1
    },
    {
        pergunta: 'Qual tecnologia reduz consumo de água em até 50%?',
        opcoes: ['Desmatamento', 'Irrigação Inteligente', 'Monocultura', 'Queimadas'],
        resposta: 1
    },
    {
        pergunta: 'Qual percentual de alimentos é desperdiçado globalmente?',
        opcoes: ['10%', '20%', '1/3', '50%'],
        resposta: 2
    },
    {
        pergunta: 'Qual é o impacto ambiental da agricultura em emissões de gases?',
        opcoes: ['5%', '15%', '25%', '35%'],
        resposta: 2
    },
    {
        pergunta: 'Drones agrícolas podem reduzir uso de químicos em quantos porcento?',
        opcoes: ['30%', '50%', '70%', '90%'],
        resposta: 2
    }
];

let quizAtual = 0;
let respostas = [];
let quizIniciado = false;

function iniciarQuiz() {
    quizIniciado = true;
    respostas = new Array(quizData.length).fill(null);
    mostrarPergunta();
}

function mostrarPergunta() {
    const quiz = quizData[quizAtual];
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const questionNumber = document.getElementById('questionNumber');
    const totalQuestions = document.getElementById('totalQuestions');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (quizQuestion) {
        quizQuestion.textContent = quiz.pergunta;
    }
    if (questionNumber) {
        questionNumber.textContent = quizAtual + 1;
    }
    if (totalQuestions) {
        totalQuestions.textContent = quizData.length;
    }

    if (quizOptions) {
        quizOptions.innerHTML = '';
        quiz.opcoes.forEach((opcao, index) => {
            const div = document.createElement('div');
            div.className = 'quiz-option';
            div.textContent = opcao;
            if (respostas[quizAtual] === index) {
                div.classList.add('selected');
            }
            div.addEventListener('click', () => selecionarOpcao(index, quizOptions));
            quizOptions.appendChild(div);
        });
    }

    if (prevBtn) {
        prevBtn.style.display = quizAtual === 0 ? 'none' : 'block';
    }
    if (nextBtn) {
        nextBtn.textContent = quizAtual === quizData.length - 1 ? 'Finalizar' : 'Próxima';
    }
}

function selecionarOpcao(index, container) {
    respostas[quizAtual] = index;
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    container.children[index].classList.add('selected');
}

function proximaPergunta() {
    if (quizAtual < quizData.length - 1) {
        quizAtual++;
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
}

function perguntaAnterior() {
    if (quizAtual > 0) {
        quizAtual--;
        mostrarPergunta();
    }
}

function finalizarQuiz() {
    let acertos = 0;
    respostas.forEach((resposta, index) => {
        if (resposta === quizData[index].resposta) {
            acertos++;
        }
    });

    const porcentagem = Math.round((acertos / quizData.length) * 100);
    mostrarResultado(acertos, porcentagem);
}

function mostrarResultado(acertos, porcentagem) {
    const quizContent = document.getElementById('quizContent');
    const quizResult = document.getElementById('quizResult');
    const scoreValue = document.getElementById('scoreValue');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultIcon = document.getElementById('resultIcon');

    if (quizContent) quizContent.style.display = 'none';
    if (quizResult) quizResult.style.display = 'block';

    if (scoreValue) scoreValue.textContent = porcentagem;

    let mensagem = '';
    let icon = '';

    if (porcentagem === 100) {
        mensagem = 'Perfeito! Você é um especialista em agricultura sustentável!';
        icon = '🏆';
    } else if (porcentagem >= 80) {
        mensagem = 'Excelente! Você entende bem sobre sustentabilidade agrícola!';
        icon = '⭐';
    } else if (porcentagem >= 60) {
        mensagem = 'Bom! Continue aprendendo sobre agricultura sustentável!';
        icon = '👍';
    } else if (porcentagem >= 40) {
        mensagem = 'Você está no caminho certo! Estude mais sobre o tema!';
        icon = '📚';
    } else {
        mensagem = 'Continue aprendendo! A agricultura sustentável é importante!';
        icon = '🌱';
    }

    if (resultTitle) resultTitle.textContent = `Sua Pontuação: ${acertos}/${quizData.length}`;
    if (resultMessage) resultMessage.textContent = mensagem;
    if (resultIcon) resultIcon.textContent = icon;
}

function resetQuiz() {
    quizAtual = 0;
    respostas = [];
    quizIniciado = false;
    const quizContent = document.getElementById('quizContent');
    const quizResult = document.getElementById('quizResult');
    if (quizContent) quizContent.style.display = 'block';
    if (quizResult) quizResult.style.display = 'none';
    mostrarPergunta();
}

// Inicializar Quiz ao carregar
document.addEventListener('DOMContentLoaded', () => {
    iniciarQuiz();
});

// Event Listeners para Quiz
document.getElementById('nextBtn')?.addEventListener('click', proximaPergunta);
document.getElementById('prevBtn')?.addEventListener('click', perguntaAnterior);

// ========== GALERIA COM FILTROS ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const galeriaItems = document.querySelectorAll('.galeria-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galeriaItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.classList.add('hidden'), 300);
            }
        });
    });
});

// ========== CONTADORES ANIMADOS ==========
function animarContadores() {
    const statBoxes = document.querySelectorAll('.stat-box');

    statBoxes.forEach(box => {
        const target = parseInt(box.getAttribute('data-target'));
        const counter = box.querySelector('.counter');
        let current = 0;
        const incremento = target / 50;

        const timer = setInterval(() => {
            current += incremento;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            if (counter) counter.textContent = Math.round(current);
        }, 30);
    });
}

// Iniciar contadores quando a seção ficar visível
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('stats')) {
            animarContadores();
            observer.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) observer.observe(statsSection);

// ========== FORMULÁRIO DE CONTATO ==========
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    
    // Simulação de envio
    alert('Mensagem enviada com sucesso! Obrigado por se interessar em agricultura sustentável!');
    this.reset();
});

// ========== EFEITO AOS (Animations On Scroll) ==========
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `${entry.target.getAttribute('data-aos')} 0.6s ease-out`;
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => scrollObserver.observe(element));
};

document.addEventListener('DOMContentLoaded', animateOnScroll);

// ========== EFEITO PARALLAX ==========
window.addEventListener('scroll', () => {
    const scrollAmount = window.scrollY;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrollAmount * 0.5}px)`;
    });
});

// ========== VALIDAÇÃO DE FORMULÁRIO ==========
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.type === 'email' && this.value) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.style.borderBottomColor = regex.test(this.value) ? '#27ae60' : '#d62828';
        }
    });
});

// ========== LOG DE INICIALIZAÇÃO ==========
console.log('🌾 Agro Forte, Futuro Sustentável - Website Inicializado!');
console.log('✅ Todas as funcionalidades carregadas com sucesso!');