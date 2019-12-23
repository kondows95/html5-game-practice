import { BaseScene } from './BaseScene';

export const TITLE_SCENE_KEY = 'TitleScene';

export class TitleScene extends BaseScene {
  constructor() {
    super({ key: TITLE_SCENE_KEY });
  }

  preload() {
    super.preloadAssets();
  }
}