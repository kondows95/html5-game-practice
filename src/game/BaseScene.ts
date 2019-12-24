import { Scene, Physics, Actions, Geom } from 'phaser';
import { fallingImages, groundImage } from './images';

const PIXCEL_SIZE = 4;

export const TITLE_SCENE_KEY = 'BaseScene';

export class BaseScene extends Scene {
  ground!: Physics.Arcade.StaticGroup;
  canvasWidth!: number;
  canvasHeight!: number;
  halfItemSize: number =  PIXCEL_SIZE * groundImage.length / 2;

  init() {
    console.log('###BaseScene:1 init()');
    this.canvasWidth = this.sys.game.canvas.width;
    this.canvasHeight = this.sys.game.canvas.height;
  }

  preloadAssets() {
    console.log('###BaseScene:2 preloadAssets()');
    for (let i=0; i<fallingImages.length; i++) {
      this.textures.generate('img'+i.toString(), { data: fallingImages[i], pixelWidth: PIXCEL_SIZE });
    }
    this.textures.generate('ground', { data: groundImage, pixelWidth: PIXCEL_SIZE });

    this.load.audio("se_ng", ["assets/se_maoudamashii_onepoint14.mp3"]);
    this.load.audio("se_ok", ["assets/se_maoudamashii_onepoint15.mp3"]);
  }

  create() {
    console.log('###BaseScene:3 create()');
    this.ground = this.physics.add.staticGroup({
      key: 'ground',
      frameQuantity: Math.ceil(this.canvasWidth / (this.halfItemSize * 2)),
    });

    const y = this.canvasHeight - this.halfItemSize;
    Actions.PlaceOnLine(
      this.ground.getChildren(),
      new Geom.Line(this.halfItemSize, y, this.halfItemSize + this.canvasWidth, y)
    );

    this.ground.refresh();

    this.sound.add('se_ok', { volume:0.05 });
    this.sound.add('se_ng', { volume:0.05 });
  }
}