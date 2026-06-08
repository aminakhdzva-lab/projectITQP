// Вопросы для IT викторины
const questions = [
    {
        question: "Что означает аббревиатура HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0,
        explanation: "HTML (Hyper Text Markup Language) - язык гипертекстовой разметки."
    },
    {
        question: "Какой язык программирования используется для стилизации веб-страниц?",
        options: ["Python", "CSS", "JavaScript", "Java"],
        correct: 1,
        explanation: "CSS (Cascading Style Sheets) используется для стилизации HTML-документов."
    },
    {
        question: "Какой тег используется для создания ссылки в HTML?",
        options: [
            "&lt;link&gt;",
            "&lt;a&gt;",
            "&lt;href&gt;",
            "&lt;url&gt;"
        ],
        correct: 1,
        explanation: "Тег &lt;a&gt; создает гиперссылки в HTML. Например: &lt;a href='https://example.com'&gt;Ссылка&lt;/a&gt;"
    },
    {
        question: "Что такое Git?",
        options: [
            "Текстовый редактор",
            "Система контроля версий",
            "Язык программирования",
            "Операционная система"
        ],
        correct: 1,
        explanation: "Git - система контроля версий для отслеживания изменений в коде."
    },
    {
        question: "Что такое API?",
        options: [
            "Автоматизированный процессорный интерфейс",
            "Интерфейс программирования приложений",
            "Автоматизированный протокол интернета",
            "Адаптивный программный интерфейс"
        ],
        correct: 1,
        explanation: "API (Application Programming Interface) позволяет программам взаимодействовать друг с другом."
    }
];

// Текущее состояние викторины
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let score = 0;

// Элементы DOM
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const progressBar = document.getElementById('progressBar');
const currentQuestionElement = document.getElementById('currentQuestion');
const totalQuestionsElement = document.getElementById('totalQuestions');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const scoreContainer = document.getElementById('scoreContainer');
const scoreValueElement = document.getElementById('scoreValue');
const resultMessageElement = document.getElementById('resultMessage');
const feedbackElement = document.getElementById('feedback');
const restartBtn = document.getElementById('restartBtn');

// Инициализация
function initQuiz() {
    totalQuestionsElement.textContent = questions.length;
    showQuestion();
    updateButtons();
}

// Показать текущий вопрос
function showQuestion() {
    const question = questions[currentQuestion];
    
    // Обновляем текст вопроса
    questionElement.textContent = question.question;
    
    // Обновляем номер вопроса
    currentQuestionElement.textContent = currentQuestion + 1;
    
    // Обновляем прогресс бар
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Создаем варианты ответов
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        // Проверяем, был ли выбран этот вариант
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <div class="option-number">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionElement.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(optionElement);
    });
}

// Выбор варианта ответа
function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    showQuestion();
    updateButtons();
}

// Обновление состояния кнопок
function updateButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === questions.length - 1;
    submitBtn.style.display = currentQuestion === questions.length - 1 ? 'flex' : 'none';
    nextBtn.style.display = currentQuestion === questions.length - 1 ? 'none' : 'flex';
}

// Переход к следующему вопросу
nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateButtons();
    }
});

// Переход к предыдущему вопросу
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateButtons();
    }
});

// Завершение викторины
submitBtn.addEventListener('click', () => {
    calculateScore();
    showResults();
});

// Расчет результатов
function calculateScore() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
            score++;
        }
    });
}

// Показать результаты
function showResults() {
    // Скрываем контейнер с вопросами
    document.querySelector('.question-card').style.display = 'none';
    
    // Показываем контейнер с результатами
    scoreContainer.style.display = 'block';
    
    // Устанавливаем значение счета
    scoreValueElement.textContent = score;
    
    // Устанавливаем сообщение в зависимости от результата
    let message = '';
    let emoji = '';
    
    if (score === questions.length) {
        message = 'Отлично! Вы IT-гуру!';
        emoji = '🎉';
    } else if (score >= 4) {
        message = 'Хороший результат!';
        emoji = '👍';
    } else if (score >= 3) {
        message = 'Неплохо, но есть куда расти!';
        emoji = '😊';
    } else {
        message = 'Продолжайте учиться!';
        emoji = '💪';
    }
    resultMessageElement.textContent = `${emoji} ${message}`;
    
    // Показываем обратную связь по ответам
    let feedbackHTML = '<h3><i class="fas fa-clipboard-check"></i> Ваши ответы:</h3>';
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        const userAnswerText = userAnswer !== null ? question.options[userAnswer] : 'Нет ответа';
        const correctAnswerText = question.options[question.correct];
        
        feedbackHTML += `
            <div class="feedback-item">
                <div class="feedback-question">${index + 1}. ${question.question}</div>
                <div>Ваш ответ: <strong>${userAnswerText}</strong></div>
                <div class="${isCorrect ? 'correct-answer' : ''}">
                    ${isCorrect ? '✅ Верно!' : '❌ Неверно'}
                </div>
                ${!isCorrect ? `<div>Правильный ответ: <span class="correct-answer">${correctAnswerText}</span></div>` : ''}
                <div><small>${question.explanation}</small></div>
            </div>
        `;
    });
    
    feedbackElement.innerHTML = feedbackHTML;
}

// Перезапуск викторины
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    score = 0;
    
    // Скрываем результаты
    scoreContainer.style.display = 'none';
    
    // Показываем вопросы
    document.querySelector('.question-card').style.display = 'block';
    
    // Сбрасываем отображение
    showQuestion();
    updateButtons();
});

// Запускаем викторину при загрузке страницы
document.addEventListener('DOMContentLoaded', initQuiz);