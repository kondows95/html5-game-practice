import { Scene, Physics, Actions, Geom, Math as Mathematics } from 'phaser';
import { fallingImages, groundImage } from './images';

const PIXCEL_SIZE = 4;

export const TITLE_SCENE_KEY = 'TitleScene';

export class TitleScene extends Scene {
  ground!: Physics.Arcade.StaticGroup;
  canvasWidth!: number;
  canvasHeight!: number;
  halfItemSize: number =  PIXCEL_SIZE * groundImage.length / 2;

  constructor() {
    super({ key: TITLE_SCENE_KEY });
  }

  init() {
    console.log('###TitleScene:1 init()');
    this.canvasWidth = this.sys.game.canvas.width;
    this.canvasHeight = this.sys.game.canvas.height;
  }

  preload() {
    console.log('###TitleScene:2 preload()');
    for (let i=0; i<fallingImages.length; i++) {
      this.textures.generate('img'+i.toString(), { data: fallingImages[i], pixelWidth: PIXCEL_SIZE });
    }
    this.textures.generate('ground', { data: groundImage, pixelWidth: PIXCEL_SIZE });
  }

  create() {
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

  }

  update(time: number) {}
}