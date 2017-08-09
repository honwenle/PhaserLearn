var game = new Phaser.Game('100%', '100%', Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var pad, stick, buttonA, hero, terrains;
function preload () {
    game.load.atlas('generic', 'images/generic-joystick.png', 'images/generic-joystick.json');
    game.load.spritesheet('hero', 'images/timg.png', 100, 100);
    game.load.image('background','images/map.jpg');
    game.load.image('glados','images/glados.png');
}
function create () {
    // 插件
    game.physics.startSystem(Phaser.Physics.ARCADE);
    pad = game.plugins.add(Phaser.VirtualJoystick);
    
    // 设置背景、边界
    game.add.tileSprite(0, 0, 3200, 2400, 'background');
    game.world.setBounds(0, 0, 3200, 2400);

    // 摇杆
    stick = pad.addStick(0, 0, 150, 'generic');
    stick.alignBottomLeft();
    stick.scale = 0.5;
    stick.posX = 80;
    stick.posY = game.camera.view.height - 80;
    // 按钮
    buttonA = pad.addButton(game.camera.view.width - 80, game.camera.view.height - 80, 'generic', 'button1-up', 'button1-down');
    buttonA.scale = 0.7;
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
    hero.scale.set(0.8);
    hero.animations.add('run', [0,1,2,3,4,5,6,7,8,9,10,11], 10, true);

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
        hero.animations.play('run');
    } else {
        hero.body.velocity.set(0);
        hero.animations.stop();
    }
}
function pressButtonA () {
    console.log('A');
}