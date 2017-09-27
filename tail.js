var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('space', 'images/tail/starfield.jpg');
    game.load.image('fire1', 'images/tail/fire1.png');
    game.load.image('fire2', 'images/tail/fire2.png');
    game.load.image('fire3', 'images/tail/fire3.png');
    game.load.image('smoke', 'images/tail/smoke-puff.png');

    game.load.spritesheet('ball', 'images/tail/plasmaball.png', 128, 128);

}

var sprite;
var emitter;
var path;
var index;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, game.width, game.height, 'space');

    emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);

    emitter.makeParticles( [ 'fire1', 'fire2', 'fire3', 'smoke' ] );

    // emitter.gravity = 0;
    emitter.setAlpha(.5, 0, 3000);
    emitter.setScale(.8, 0, .8, 0, 1500);

    emitter.start(false, 1500, 5);

    sprite = game.add.sprite(200, 300, 'ball', 0);

    game.physics.arcade.enable(sprite);

    game.physics.arcade.gravity.y = 200;
    game.physics.arcade.checkCollision.left = false;
    game.physics.arcade.checkCollision.right = false;

    sprite.body.setSize(80, 80, 0, 0);
    sprite.body.collideWorldBounds = true;
    sprite.body.bounce.set(1);
    // sprite.body.velocity.set(300, 200);
    sprite.body.gravity.y = -200;

    sprite.inputEnabled = true;

    sprite.input.enableDrag();
    sprite.events.onDragStart.add(onDragStart, this);
    sprite.events.onDragStop.add(onDragStop, this);

    sprite.animations.add('pulse');
    sprite.play('pulse', 30, true);

    sprite.anchor.set(0.5);

    createText(16, 16, 'If you can catch the fireball, drag it around');

}

function update() {

    var px = sprite.body.velocity.x;
    var py = sprite.body.velocity.y;

    // px *= -1;
    // py *= -1;

    emitter.minParticleSpeed.set(px, py);
    emitter.maxParticleSpeed.set(px, py);

    emitter.emitX = sprite.x;
    emitter.emitY = sprite.y;

    // emitter.forEachExists(game.world.wrap, game.world);
    game.world.wrap(sprite, 64);

}

function onDragStart() {
    sprite.body.moves = false;
}

function onDragStop() {
    sprite.body.moves = true;
}

function createText(x, y, string) {

    var text = game.add.text(x, y, string);
    // text.anchor.set(0.5);
    // text.align = 'center';

    //  Font style
    text.font = 'Arial Black';
    text.fontSize = 20;
    // text.fontWeight = 'bold';
    text.fill = '#ffffff';
    text.setShadow(2, 2, 'rgba(0, 0, 0, 0.7)', 2);

    return text;

}


function render() {

    // game.debug.bodyInfo(sprite, 32, 32);

}