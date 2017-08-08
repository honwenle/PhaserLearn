var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var pad, stick, buttonA, hero;
function preload () {
    game.load.atlas('generic', 'images/generic-joystick.png', 'images/generic-joystick.json');
    game.load.image('hero', 'images/star.png');
    game.load.image('background','images/background.jpg');
}
function create () {
    game.add.tileSprite(0, 0, 1537, 1537, 'background');
    game.world.setBounds(0, 0, 1537, 1537);
    // 插件
    game.physics.startSystem(Phaser.Physics.ARCADE);
    pad = game.plugins.add(Phaser.VirtualJoystick);

    // 摇杆
    stick = pad.addStick(0, 0, 150, 'generic');
    stick.alignBottomLeft();
    stick.scale = 0.5;
    // 按钮
    buttonA = pad.addButton(700, 520, 'generic', 'button1-up', 'button1-down');
    buttonA.onDown.add(pressButtonA, this);
    // 英雄
    hero = game.add.sprite(game.world.centerX, game.world.centerY, 'hero');
    game.physics.arcade.enable(hero);
    hero.body.collideWorldBounds = true;

    game.camera.follow(hero);
}
function update () {
    if (stick.isDown) {
        game.physics.arcade.velocityFromRotation(
            stick.rotation,
            400,
            hero.body.velocity
        );
    } else {
        hero.body.velocity.set(0);
    }
}
function pressButtonA () {
    console.log('A');
}