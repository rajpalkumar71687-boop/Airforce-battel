const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#001d3d",
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;

function preload() {

}

function create() {

    player = this.add.rectangle(
        config.width / 2,
        config.height - 80,
        50,
        50,
        0x00ffff
    );

    this.input.on("pointermove", (pointer) => {
        player.x = pointer.x;
    });

}

function update() {

}
