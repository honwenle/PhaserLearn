var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload () {
    game.load.image('sky', 'images/sky.png');
    game.load.image('ground', 'images/ground.png');
    game.load.image('star', 'images/star.png');
    game.load.spritesheet('hero', 'images/dude.png', 32, 48);
    // game.load.spritesheet('hero', 'images/hcr.png', 50, 60);
}

var platforms, player, cursors, stars, score = 0, scoreText;

function create () {
    // 添加地面、板子
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true; // 可碰撞
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true; // 不动摇
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // 添加主角
    player = game.add.sprite(100, game.world.height - 150, 'hero');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    // player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    // player.animations.add('right', [9, 10, 11, 12, 13, 14, 15, 16], 10, true);

    // 添加星星
    stars = game.add.group();
    stars.enableBody = true;
    for (var i = 0; i < 13; i++) {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    // 添加计分
    scoreText = game.add.text(game.world.width - 200, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    // 监听键盘
    cursors = game.input.keyboard.createCursorKeys();
}

function update () {
    // 检查碰撞
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    // 检查重叠
    game.physics.arcade.collide(player, stars, getStar, null, this);

    // 响应键盘
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -320;
    }
}

function getStar (player, star) {
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
}