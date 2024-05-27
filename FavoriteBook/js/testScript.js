const quizData = {
    questions: [
      {
      "question": "Яке з названих міст знаходиться в мирі Пісні Льоду і Вогню?",
      "answers": [
        {"text": "Ейгонфорт", "correct": true},
        {"text": "Рим", "correct": false},
        {"text": "Лондон", "correct": false},
        {"text": "Сінгапур", "correct": false}
      ]
    },
    {
      "question": "Яка з наступних фраз є девізом дому Старків?",
      "answers": [
        {"text": "Прірва іншим і дім своїм", "correct": false},
        {"text": "Вірність сім'ї", "correct": false},
        {"text": "Боїться, що Лис її не вкусить", "correct": false},
        {"text": "Зима наближається", "correct": true}
      ]
    },
    {
      "question": "Хто з персонажів є незаконним сином Еддарда Старка?",
      "answers": [
        {"text": "Теон Грейджой", "correct": false},
        {"text": "Брандон Старк", "correct": false},
        {"text": "Джон Сноу", "correct": true},
        {"text": "Робб Старк", "correct": false}
      ]
    },
    {
      "question": "Яка країна є рідною для Дейенеріс Таргарієн?",
      "answers": [
        {"text": "Браавос", "correct": false},
        {"text": "Есос", "correct": true},
        {"text": "Уестерос", "correct": false},
        {"text": "Дорн", "correct": false}
      ]
    },
    {
        "question": "Хто є автором книг, на яких базується телесеріал Гра Престолів?",
        "answers": [
          {"text": "Джоан Роулінг", "correct": false},
          {"text": "Джордж Мартін", "correct": true},
          {"text": "Джордж Оруелл", "correct": false},
          {"text": "Курт Воннеґут", "correct": false}
        ]
    },
    {
        "question": "Яка книга в серії 'Пісня Льоду і Вогню' першою вийшла в 1996 році?",
        "answers": [
          {"text": "Гра Престолів", "correct": true},
          {"text": "Буря Мечів", "correct": false},
          {"text": "Танець з драконами", "correct": false},
          {"text": "Міст іншого світу", "correct": false}
        ]
      },
      {
        "question": "Що символізує Дракон?",
        "answers": [
          {"text": "Любов", "correct": false},
          {"text": "Чистоту", "correct": false},
          {"text": "Мудрість", "correct": false},
          {"text": "Владу", "correct": true}
        ]
      },
      {
        "question": "Хто з персонажів став першим Королем на Залізному Троні?",
        "answers": [
          {"text": "Мерн Гарден", "correct": false},
          {"text": "Еддард Старк", "correct": false},
          {"text": "Ейгон Таргарієн", "correct": true},
          {"text": "Джерольд Ланністер", "correct": false}
        ]
      },
      {
        "question": "Яка з книг серії 'Пісня Льоду і Вогню' має найбільшу кількість глав?",
        "answers": [
          {"text": "Гра престолів", "correct": false},
          {"text": "Танець з драконами", "correct": true},
          {"text": "Вогонь і Кров", "correct": false},
          {"text": "Буря мечів", "correct": false}
        ]
      },
      {
          "question": "Хто з персонажів у серії 'Пісня Льоду і Вогню' відомий як 'Королева Драконів'?",
          "answers": [
            {"text": "Мельісандра", "correct": false},
            {"text": "Дейенеріс Таргарієн", "correct": true},
            {"text": "Серсея Ланістер", "correct": false},
            {"text": "Санса Старк", "correct": false}
          ]
      }
    ]
  };
  
  const quizContainer = document.getElementById('quiz-container');
  const submitButton = document.getElementById('submit-btn');
  const resultElement = document.getElementById('result');
  
  let score = 0;
  
  loadQuestions();
  
  submitButton.addEventListener('click', () => {
    score = 0;
    quizData.questions.forEach((question, index) => {
      const selectedAnswer = document.querySelector(`input[name="answer-${index}"]:checked`);
      if (selectedAnswer) {
        const answerText = selectedAnswer.nextElementSibling.innerText;
        const correct = question.answers.find(answer => answer.text === answerText).correct;
        if (correct) {
          score++;
        }
      }
    });
    showResult();
  });
  
  function loadQuestions() {
    quizData.questions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.innerText = question.question;
      quizContainer.appendChild(questionElement);
  
      const answerContainer = document.createElement('div');
      question.answers.forEach(answer => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.innerHTML = `
          <input type="radio" name="answer-${index}" id="${answer.text}-${index}">
          <label for="${answer.text}-${index}">${answer.text}</label>
        `;
        answerContainer.appendChild(answerElement);
      });
      quizContainer.appendChild(answerContainer);
    });
  }
  
  function showResult() {
    submitButton.style.display="none";
    quizContainer.style.display="none";
    
    if (score === 0){
      resultElement.innerText = `Ваш результат: ${score} з ${quizData.questions.length}
      Ви навіть не дивилися серіал.`;
  } else if(score <= 7 && score >= 1){
      resultElement.innerText = `Ваш результат: ${score} з ${quizData.questions.length}
      Ви дивилися серіал.`;
  } else if(score > 7){
      resultElement.innerText = `Ваш результат: ${score} з ${quizData.questions.length}
      Ви читали книги Джорджа Мартіна.`;
  }
  
  
    resultElement.style.display = 'block'; 
  }
  
  
  
  document.addEventListener("DOMContentLoaded", function() {
    var menuToggle = document.querySelector('.mobile-menu-toggle');
    var menu = document.querySelector('.menu');
  
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('open');
    });
  });
    