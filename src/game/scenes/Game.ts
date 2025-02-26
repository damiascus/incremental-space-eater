import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import Matter from "matter-js";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.gameText = this.add
            .text(
                512,
                384,
                "Make something fun!\nand share it with us:\nsupport@phaser.io",
                {
                    fontFamily: "Arial Black",
                    fontSize: 38,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                }
            )
            .setOrigin(0.5)
            .setDepth(100);

        this.matter.world.setBounds(); // Enable Matter physics in Phaser

        // Create a static ground
        const ground = this.matter.add.rectangle(400, 580, 800, 40, {
            isStatic: true,
        });

        // Create a dynamic ball
        const ball = this.matter.add.circle(400, 200, 20);

        // Apply a force to the ball
        Matter.Body.applyForce(ball as Matter.Body, ball.position, {
            x: 0.02,
            y: -0.02,
        });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
