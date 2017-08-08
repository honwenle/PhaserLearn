var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var pad, stick, buttonA, hero, terrains;
function preload () {
    game.load.atlas('generic', 'images/generic-joystick.png', 'images/generic-joystick.json');
    game.load.image('hero', 'images/star.png');
    game.load.image('background','images/background.jpg');
    game.load.image('glados','images/glados.png');
}
function create () {
    // 插件
    game.physics.startSystem(Phaser.Physics.ARCADE);
    pad = game.plugins.add(Phaser.VirtualJoystick);
    
    // 设置背景、边界
    game.add.tileSprite(0, 0, 1537, 1537, 'background');
    game.world.setBounds(0, 0, 1537, 1537);

    // 摇杆
    stick = pad.addStick(0, 0, 150, 'generic');
    stick.alignBottomLeft();
    stick.scale = 0.5;
    // 按钮
    buttonA = pad.addButton(700, 520, 'generic', 'button1-up', 'button1-down');
    buttonA.onDown.add(pressButtonA, this);

    // 地形
    terrains = game.add.group();
    terrains.enableBody = true;
    var terrain1 = terrains.create(game.world.centerX, game.world.centerY, 'glados');
    terrain1.body.immovable = true;
    terrain1.anchor.set(0.5);
    terrain1.scale.set(0.5);

    // 英雄
    hero = game.add.sprite(50, game.world.height - 50, 'hero');
    game.physics.arcade.enable(hero);
    hero.body.collideWorldBounds = true;

    game.camera.follow(hero);
}
function update () {
    game.physics.arcade.collide(hero, terrains);
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