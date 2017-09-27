/* global Phaser */
window.onload = function() {
    var game = new Phaser.Game(800,600,Phaser.AUTO,'game', {preload: preload,create: create,update: update});
    var grid = 16;
    var spriteSize = 70;
    var densidad = 7;
    var player,cursors,insumos,conteo;
    var insumo;
    var objetivos = [];
    function preload() {
        game.load.spritesheet('player', 'assets/img/hamb_spritesheet_70x70.png', 70, 70);
        var nombre;
        for (var i=1;i<8;i++) {
            nombre = 'p'+i;
            game.load.image(nombre, 'assets/img/'+nombre+'.png');
            objetivos.push(nombre);
        }
    }
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        player = game.add.sprite(game.world.width/2, game.world.height*(2/3), 'player');
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        cursors = game.input.keyboard.createCursorKeys();
        insumos = game.add.group();
        insumos.enableBody = true;
        conteo = -1;
        cuenta();
        game.time.events.add(Phaser.Timer.SECOND * densidad,cuenta,this).loop = true;
    }
    function update() {
        var hit = game.physics.arcade.overlap(player, insumos, chocaInsumo, null, this);
        player.body.velocity.x = 0;
        if (cursors.left.isDown) {
            if (cursors.left.duration < 1000) {
                player.body.velocity.x = -game.world.width / (grid / (cursors.left.duration * 0.008));
            } else {
                player.body.velocity.x = -game.world.width / (grid / 8);
            }
        }
        else if (cursors.right.isDown) {
            if (cursors.right.duration < 1000) {
                player.body.velocity.x = game.world.width / (grid / (cursors.right.duration * 0.008));
            } else {
                player.body.velocity.x = game.world.width / (grid / 8);
            }
        }
    }
    function chocaInsumo(player,insumo) {
        if (insumo.body.overlapY < -35) {
            insumo.kill();
        }
    }
    function cuenta() {
        conteo++;
        var num;
        if (conteo >= 6) {
            num = 7;
        } else {
            num = conteo+1;
        }
        for (var i=1;i<8;i++) {
            for (var g=0;g<num;g++) {
                var tipoInsumo = objetivos[Math.floor(Math.random()*objetivos.length)];
                var pos = Math.floor(Math.random()*grid) / grid;
                insumo = insumos.create(game.world.width*pos, -spriteSize*i*4, tipoInsumo);
                insumo.body.gravity.y = spriteSize*(conteo+1);
            }
        }
    }
};