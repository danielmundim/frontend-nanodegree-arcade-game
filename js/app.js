// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // Enemy position
    this.x = Math.random() * (500 - 0) + 0;
    this.y = y;

    //Enemy dimensions
    this.right = 50;
    this.left = 0;
    this.bottom = 50;
    this.top = 0;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (100 * dt);
    console.log(this.left);
    this.collision();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.x > 500) {
        this.x = -100;
    }
}

Enemy.prototype.collision = function() {

    allEnemies.forEach(function(enemy) {
        if(enemy.x + enemy.left < player.x + player.right &&
            enemy.x + enemy.right > player.x + player.left &&
            enemy.y + enemy.top < player.y + player.bottom &&
            enemy.y + enemy.bottom > player.y + player.top) {
            player.restartPosition();
        }
    });
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    //-> Player position
    this.x = 200;
    this.y = 390;

    //-> Playper dimensions
    this.right = 77;
    this.left = -15;
    this.bottom = 55;
    this.top = -25;

    this.sprite = 'images/char-boy.png'
}

Player.prototype.update = function() {

}


Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.restartPosition = function() {
    player.x = 200;
    player.y = 390;
}

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (this.y - 40 >= -10) {
                this.y -= 40;
            }
            else {
                this.y = -10;
            }
            break;
        case 'down':
            this.y += 40;
            break;
        case 'left':
            this.x -= 40;
            break;
        case 'right':
            this.x += 40;
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(60), new Enemy(140), new Enemy(220),new Enemy(60), new Enemy(140), new Enemy(220),]

var player = new Player();

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
