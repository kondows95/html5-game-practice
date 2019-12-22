import { Scene, Physics, Actions, Geom, Math as Mathematics } from 'phaser';
import { fallingImages, groundImage } from './images';

const PIXCEL_SIZE = 4;

export const SCENE_KEY = 'GameScene';

export class GameScene extends Scene {
  emitInterval: number = 1000;
  lastEmittedTime: number = 0;
  caught: number = 0;
  ground!: Physics.Arcade.StaticGroup;
  canvasWidth!: number;
  canvasHeight!: number;
  halfItemSize: number =  PIXCEL_SIZE * groundImage.length / 2;

  constructor() {
    super({ key: SCENE_KEY });
  }

  init() {
    console.log('###GameScene:1 init()');
    this.canvasWidth = this.sys.game.canvas.width;
    this.canvasHeight = this.sys.game.canvas.height;
  }

  preload() {
    console.log('###GameScene:2 preload()');
    for (let i=0; i<fallingImages.length; i++) {
      this.textures.generate('img'+i.toString(), { data: fallingImages[i], pixelWidth: PIXCEL_SIZE });
    }
    this.textures.generate('ground', { data: groundImage, pixelWidth: PIXCEL_SIZE });
  }

  create() {
    console.log('###GameScene:3 create()');

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

    this.scene.pause();
  }

  update(time: number) {
    const diff: number = time - this.lastEmittedTime;
    if (diff > this.emitInterval) {
      this.lastEmittedTime = time;
      if (this.emitInterval > 400) {
        this.emitInterval -= 20;//speed-up
      }
      this.emitItem();
    }
  }

  destroyItem = (item: Physics.Arcade.Image, ondestroyItem?: Function) => () => {
    item.destroy();
    if (!ondestroyItem) {
      return;
    }
    ondestroyItem();
  }

  private emitItem() {
    const x = Mathematics.Between(this.halfItemSize+4, this.canvasWidth-this.halfItemSize-4);
    const y = 0;

    const itemKey = 'img' + Mathematics.Between(0, fallingImages.length-1).toString();
    const item = this.physics.add.image(x, y, itemKey);

    item.setVelocity(0, 200);
    item.setInteractive();

    item.on('pointerdown', this.onPointerDown(item), this);
    this.physics.add.collider(item, this.ground, this.onCollide(item), undefined, this);
  }

  private onCollide(item: Physics.Arcade.Image) {
    return () => {
      item.setTint(0xff0000);
      this.time.delayedCall(
        100,
        this.destroyItem(item, () => {
          console.log('###4 GAMEOVER!!! (destroy)');
          this.game.events.emit('onGameOver');
          this.game.destroy(false);
        }),
        [item],
        this
      );
    };
  }

  private onPointerDown(item: Physics.Arcade.Image): () => void {
    return  () => {
      item.setTint(0x00ff00);
      item.setVelocity(0, 0);
      this.caught += 1;
      this.game.events.emit('onCaught', this.caught);
      this.time.delayedCall(
        100,
        this.destroyItem(item),
        [item],
        this
      );
    }
  }
}