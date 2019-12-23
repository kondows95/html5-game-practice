import { Physics, Math as Mathematics } from 'phaser';
import { fallingImages, groundImage } from './images';
import { BaseScene } from './BaseScene';

const PIXCEL_SIZE = 4;

export const GAME_SCENE_KEY = 'GameScene';

export class GameScene extends BaseScene {
  emitInterval: number = 1000;
  lastEmittedTime: number = 0;
  caught: number = 0;
  ground!: Physics.Arcade.StaticGroup;
  canvasWidth!: number;
  canvasHeight!: number;
  halfItemSize: number =  PIXCEL_SIZE * groundImage.length / 2;

  constructor() {
    super({ key: GAME_SCENE_KEY });
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
    console.log('update.emitItem')
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
          console.log('###4 GAMEOVER!!!');
          this.game.events.emit('onGameOver');
          //this.game.destroy(false);
          this.scene.pause();
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