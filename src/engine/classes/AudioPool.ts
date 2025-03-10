import Pop from "../../assets/sounds/bust.mp3";
import Collide from "../../assets/sounds/collide.mp3";
import Go from "../../assets/sounds/go.mp3";
import Multiplier from "../../assets/sounds/points-multi.mp3";
import Ready from "../../assets/sounds/ready.mp3";
import ScoreMulti from "../../assets/sounds/score-multi.mp3";
import Score from "../../assets/sounds/score.mp3";
import Shoot from "../../assets/sounds/shoot.mp3";

export default class AudioPool {
  maxCount: number = 30;
  pool: HTMLAudioElement[] = [];
  Sounds: {
    [name: string]: { name: string; timeStamp?: number };
  };

  constructor() {
    for (let i = 0; i < this.maxCount; i++) {
      this.pool.push(new Audio());
    }

    this.Sounds = {
      pop: { name: Pop, timeStamp: 0.2 },
      go: { name: Go },
      collide: { name: Collide, timeStamp: 0.25 },
      multiplier: { name: Multiplier, timeStamp: 0.4 },
      ready: { name: Ready },
      scoreMulti: { name: ScoreMulti },
      score: { name: Score, timeStamp: 0.25 },
      shoot: { name: Shoot, timeStamp: 0.1 },
    };
  }

  playSound(
    sound:
      | "pop"
      | "go"
      | "collide"
      | "multiplier"
      | "ready"
      | "scoreMulti"
      | "score"
      | "shoot"
  ) {
    let audio;
    for (let i = 0; i < this.maxCount; i++) {
      if (this.pool[i].ended) audio = this.pool[i];
    }
    if (!audio) audio = new Audio();

    audio.src = this.Sounds[sound].name;
    if (this.Sounds[sound].timeStamp)
      audio.currentTime = this.Sounds[sound].timeStamp;
    audio.play();
  }
}
