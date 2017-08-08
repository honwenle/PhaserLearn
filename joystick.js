var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var pad, stick, buttonA;
function preload () {
    game.load.atlas('generic', 'images/generic-joystick.png', 'images/generic-joystick.json');
}
function create () {
    pad = game.plugins.add(Phaser.VirtualJoystick);
    stick = pad.addStick(0, 0, 150, 'generic');
    stick.alignBottomLeft(20);
    stick.scale = 0.5;
    stick.posX = 100;
    stick.posY = 520;
    buttonA = pad.addButton(700, 520, 'generic', 'button1-up', 'button1-down');
    buttonA.onDown.add(pressButtonA, this);
}
function update () {}
function pressButtonA () {
    console.log('A');
}