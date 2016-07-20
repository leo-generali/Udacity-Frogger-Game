var Enemy = function(enemyX, enemyY, enemySpeed) {
    //USER ADDED - Speed of enemy can be set
    this.x = enemyX;
    this.y = enemyY;
    this.speed = enemySpeed;
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    //USER ADDED - If the enemy moves off screen they are teleported back to the other side.
    this.x = this.x += (this.speed * dt);  
    if(this.x > 500){
        this.x = -100;
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//USER ADDED - 
var Player = function(startingX, startingY){
    this.x = startingX;
    this.y = startingY;
    this.sprite = 'images/char-boy.png';
};


Player.prototype.update = function(dt){
    this.checkCollisions();
};

//USER ADDED - Checks for a collision between player and enemy. If enemy and player collide
//the game resets. If the player reaches the end of the map the win function is called
Player.prototype.checkCollisions = function() {
    for(var i = 0; i < allEnemies.length; i++){
        if(player.x < allEnemies[i].x + 30 &&
            player.x + 30 > allEnemies[i].x &&
            player.y < allEnemies[i].y + 30 &&
            player.y + 30 > allEnemies[i].y) {
            this.x = 200;
            this.y = 375;
            score = 0;
            for(var i = 0; i < allEnemies.length; i++){
                allEnemies[i].speed = randomSpeed();
            }
        }
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//USER ADDED - Checks if players next key press moves their character out of the game map.
//No action taken if the character can move off the map.
Player.prototype.handleInput = function(key){
    switch(key){
        case 'left': 
            if(this.x - 101 < -2){
                break;
            }
            this.x -= 101;
        break;
        case 'right': 
            if(this.x + 101 > 450){
                break;
            }
            this.x += 101;
        break;
        case 'up': 
                if(this.y - 83 < 0 ){
                win();
                break;
            }
            this.y -= 83;
        break;

        case 'down': 
            if(this.y + 83 > 450 ){
                break;
            }
            this.y += 83;
        break;
    }
};

//USER ADDED - Creates a new player at the provided X, Y coordinate
var player = new Player(200, 375);

//USER ADDED - Creates a random speed between 100 and 300.
var randomSpeed = function(){
    return Math.random() * (300 - 100) + 100;
};

//USER ADDED - Creates the enemies and populates the gameboard
var enemy1 = new Enemy(300, 126, randomSpeed());
var enemy2 = new Enemy(100, 209, randomSpeed());
var enemy3 = new Enemy(200, 292, randomSpeed());
var allEnemies = [enemy1, enemy2, enemy3]; 
var score = 0;

//USER ADDED - Moves player back to start, increases difficulty (enemy speed goes up), and
//ups the score by 10.
var win = function(){
    score += 10;
    for(var i = 0; i < allEnemies.length; i++){
        allEnemies[i].speed += 20;
    }
    player.x = 200;
    player.y = 375;
    console.log(score);
    return true;
};


document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});