var myGameArea = {
    canvas: null,
    canvasCreated: false,
    groundCollisions: 0,
    keys: {}, // Об'єкт для зберігання стану натиснутих клавіш

    start: function () {
        var container = document.querySelector('.smallBlock');

        // Перевіряємо, чи вже існує canvas в container і чи не був він створений раніше
        if (!this.canvas || !this.canvasCreated) {
            // Якщо canvas не існує або ще не був створений, створюємо його
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d");
            container.appendChild(this.canvas);
            this.canvasCreated = true;
        }

        // Оновлюємо розміри canvas, враховуючи padding та розмір екрану
        var computedStyle = getComputedStyle(container);
        var paddingTop = parseInt(computedStyle.paddingTop);
        var paddingRight = parseInt(computedStyle.paddingRight);
        var paddingBottom = parseInt(computedStyle.paddingBottom);
        var paddingLeft = parseInt(computedStyle.paddingLeft);

        var containerWidth = container.clientWidth;
        var containerHeight = container.clientHeight;

        // Задаємо розміри канвасу відносно розміру вікна та враховуючи padding
        this.canvas.width = containerWidth - paddingLeft - paddingRight;
        this.canvas.height = containerHeight - paddingTop - paddingBottom;

        // Додаємо обробники подій клавіатури
        window.addEventListener('keydown', function (e) {
            myGameArea.keys[e.keyCode] = true;
        });

        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        });

        this.interval = setInterval(updateGameArea, 20);
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function() {
        // Перевіряємо, чи натиснута відповідна клавіша і встановлюємо швидкість руху
        if (myGameArea.keys && myGameArea.keys[37]) {this.speedX = -6; }
        if (myGameArea.keys && myGameArea.keys[39]) {this.speedX = 6; }

        // Забороняємо рух по осі Y
        this.speedY = 0;

        // Перевіряємо, чи натискання клавіші закінчилося і скидаємо швидкість руху
        if (!myGameArea.keys[37] && !myGameArea.keys[39]) {this.speedX = 0; }

        // Оновлення положення по осі X
        if (this.x + this.speedX >= 0 && this.x + this.speedX <= myGameArea.canvas.width - this.width) {
            this.x += this.speedX;
        }
    };
}

function groundComponent(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
        myGameArea.context.fillStyle = color;
        myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
    };
}

var myGround;
var score = 0;

function FallingBlock(width, height, color, x, y, speedY) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedY = speedY;
    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.newPos = function() {
        this.y += this.speedY;
        if (this.y > myGameArea.canvas.height) {
            this.y = 0 - this.height; // Перезапускаємо блок, якщо він вийшов за межі екрану
            this.x = Math.floor(Math.random() * (myGameArea.canvas.width - this.width)); // Змінюємо його позицію
        }
    };
}

var fallingBlocks = [];

function generateFallingBlocks() {
    var width = 50;
    var height = 20;
    var color = "blue";
    var speedY = 2; // Швидкість падіння блоків

    setInterval(function() {
        var x = Math.floor(Math.random() * (myGameArea.canvas.width - width));
        var y = -height; // Початкова позиція блока зверху
        var newBlock = new FallingBlock(width, height, color, x, y, speedY);
        fallingBlocks.push(newBlock);
    }, 2700); // Генерувати нові блоки кожні 2 секунди
}

function updateGameArea() {
    myGameArea.clear();
    myGround.update();
    myGamePiece.newPos();
    myGamePiece.update();

    // Перевірка колізій між червоним блоком і синіми блоками
    for (var i = 0; i < fallingBlocks.length; i++) {
        fallingBlocks[i].newPos();
        fallingBlocks[i].update();
            // Оновлення рахунку
             myGameArea.context.font = "18px Arial";
            myGameArea.context.fillStyle = "black";
            myGameArea.context.fillText("Score: " + score, 10, 20);
        // Колізія з червоним блоком
        if (myGamePiece.x < fallingBlocks[i].x + fallingBlocks[i].width &&
            myGamePiece.x + myGamePiece.width > fallingBlocks[i].x &&
            myGamePiece.y < fallingBlocks[i].y + fallingBlocks[i].height &&
            myGamePiece.y + myGamePiece.height > fallingBlocks[i].y) {
            // Видаляємо блок, з яким відбулася колізія
            fallingBlocks.splice(i, 1);
            i--; // Зменшуємо індекс, оскільки масив скоротився
            score++;
            
        }

        // Колізія з землею
        if (fallingBlocks[i].y + fallingBlocks[i].height > myGround.y) {
            // Видаляємо блок, що дійшов до землі
            fallingBlocks.splice(i, 1);
            i--; // Зменшуємо індекс, оскільки масив скоротився
            
            myGameArea.groundCollisions++;

            // Перевіряємо кількість колізій з землею
            if (myGameArea.groundCollisions >= 3) {
                // Виводимо повідомлення "Game Over"
                

                // Відображаємо "Game Over" у вікні гри
                document.getElementById('gameOver').style.display = 'block';

                // Відображаємо кнопку рестарту
                document.getElementById('restartButton').style.display = 'block';
                document.getElementById('viewTopScoresButton').style.display = 'block';
                var topScores = getTopScores();
                topScores.push(score);
                topScores.sort((a, b) => b - a);
                topScores = topScores.slice(0, 3);
                localStorage.setItem('topScores', JSON.stringify(topScores));
                // Зупиняємо ігровий інтервал
                clearInterval(myGameArea.interval);

        
            }
        }

        // Колізія з червоною компонентою (myGamePiece)
        if (fallingBlocks[i].x < myGamePiece.x + myGamePiece.width &&
            fallingBlocks[i].x + fallingBlocks[i].width > myGamePiece.x &&
            fallingBlocks[i].y < myGamePiece.y + myGamePiece.height &&
            fallingBlocks[i].y + fallingBlocks[i].height > myGamePiece.y) {
            // Видаляємо блок, з яким відбулася колізія
            fallingBlocks.splice(i, 1);
            i--; // Зменшуємо індекс, оскільки масив скоротився
            
           
        }
    }
}

function showTopScores() {
    var topScores = getTopScores();

    // Очищаємо лише частину канвасу для відображення рахунків
    myGameArea.context.clearRect(0, 0, 200, 100);

    // Відображаємо повідомлення "Top Scores:"
    myGameArea.context.font = "18px Arial";
    myGameArea.context.fillStyle = "black";
    myGameArea.context.fillText("Top Scores:", 10, 20);

    // Відображаємо список найвищих рахунків
    for (var i = 0; i < topScores.length; i++) {
        myGameArea.context.fillText((i + 1) + ". " + topScores[i], 10, 40 + 20 * i);
    }
}


function getTopScores() {
    var scores = localStorage.getItem('topScores');
    if (scores) {
        return JSON.parse(scores);
    }
    return [];
}

function restartGame() {
    // Приховуємо повідомлення "Game Over"
    document.getElementById('gameOver').style.display = 'none';

    // Приховуємо кнопку рестарту
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('viewTopScoresButton').style.display = 'none';
    score = 0;
    // Оновлюємо відображення рахунку
    
    // Починаємо гру заново
    myGameArea.start();

    // Скидаємо кількість колізій з землею
    myGameArea.groundCollisions = 0;

    // Очищуємо масив падаючих блоків
    fallingBlocks = [];

    // Починаємо генерувати падаючі блоки знову
    generateFallingBlocks();
}

window.onload = function() {
    myGameArea.start();
    myGamePiece = new component(120, 30, "red", 10, myGameArea.canvas.height-50);
    myGround = new groundComponent(myGameArea.canvas.width, 20, "green", 0, myGameArea.canvas.height - 20);
    generateFallingBlocks();
   
};
