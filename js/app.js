// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //assigns initial position, relative speed, and size parameters
    this.x = x;
    this.y = y;
    this.difficulty = 1;  //difficulty multiplier for higher scores/levels
    this.speed = speed;
    this.width = 76;
    this.height = 56;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed*this.difficulty*dt;    //updates bug's position based on dt and assigned rele speed
    if (this.x > 600){                  // returns bug to left side of canvas after it passes off the screen
      this.x = -100;
    }

    //adjusts enemy difficulty based upon player score
    this.difficulty = (player.wins * .1) + 1;
};
Enemy.prototype.checkCollisions = function() {
    // check collisions - code adapted from MDN Axis-Aligned Bounding Box
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
            player.dead = true;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    // set the graphical representation of the player
    this.sprite = 'images/char-boy.png';
    // set the initial position of the player
    this.x = 200;
    this.y = 400;
    //set the size of he player for collision detection
    this.width = 66;
    this.height = 66;
    // initialize score and lives
    this.wins = 0;
    this.lives = 3;
    this.dead = false;
};

Player.prototype.update = function () {
    // tests status of player, returns player to beginning if "dead"
    if (this.dead){
        this.x = 200;
        this.y = 400;
        this.lives--;
        this.dead = false;
    }
    // tests lives left, resets score and lives if all lost
    if (this.lives === 0){
        this.wins = 0;
        this.lives = 3;
    }
    // tests if player has crossed "finish line", increments wins, returns player to start
    if (this.y < 1){
        this.wins++
        this.x = 200;
        this.y = 400;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    console.log(this.x, this.y);

    //tests key input against direction and updates player
    //position if edge of canvas has not been reached
    if (key == 'left' && this.x > 0){
        this.x = this.x - 100;
    } else if (key == 'right' && this.x < 399) {
        this.x = this.x + 100;
    } else if (key == 'up' && this.y > 0) {
        this.y = this.y - 80;
    } else if (key == 'down' && this.y < 399) {
        this.y = this.y + 80;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-100, 240, 20), new Enemy(-200, 320, 60), new Enemy(-100, 150, 30), new Enemy(-100, 150, 70), new Enemy(-100, 70, 85)];
var player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
