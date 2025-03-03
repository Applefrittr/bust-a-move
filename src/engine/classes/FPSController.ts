export default class FPSController {
  msPrev: number = performance.now();
  fps: number = 60;
  msPerFrame: number = 1000 / this.fps;

  constructor() {}

  renderFrame() {
    const msNow = performance.now();
    const msPassed = msNow - this.msPrev;

    if (msPassed < this.msPerFrame) return false;

    const msExcess = Math.round(msPassed % this.msPerFrame);
    this.msPrev = msNow - msExcess;
    return true;
  }
}
