import GreenIdle from "../../assets/orb-green-idle.png";
import GreenShine from "../../assets/orb-green-shine.png";
import GreenBust from "../../assets/orb-green-bust.png";
// import YellowIdle from "../../assets/orb-yellow-idle.png";
// import YellowShine from "../../assets/orb-yellow-shine.png";
// import BlueIdle from "../../assets/orb-blue-idle.png";
// import BlueShine from "../../assets/orb-blue-shine.png";
// import PurpleIdle from "../../assets/orb-purple-idle.png";
// import PurpleShine from "../../assets/orb-purple-shine.png";
// import RedIdle from "../../assets/orb-red-idle.png";
// import RedShine from "../../assets/orb-red-shine.png";
// import WhiteIdle from "../../assets/orb-white-idle.png";
// import WhiteShine from "../../assets/orb-white-shine.png";

const greenOrbIdle = new Image();
greenOrbIdle.src = GreenIdle;
const greenOrbShine = new Image();
greenOrbShine.src = GreenShine;
const greenOrbBust = new Image();
greenOrbBust.src = GreenBust;

// const yellowOrbIdle = new Image();
// yellowOrbIdle.src = YellowIdle;
// const yellowOrbShine = new Image();
// yellowOrbShine.src = YellowShine;

// const blueOrbIdle = new Image();
// blueOrbIdle.src = BlueIdle;
// const blueOrbShine = new Image();
// blueOrbShine.src = BlueShine;

// const purpleOrbIdle = new Image();
// purpleOrbIdle.src = PurpleIdle;
// const purpleOrbShine = new Image();
// purpleOrbShine.src = PurpleShine;

// const redOrbIdle = new Image();
// redOrbIdle.src = RedIdle;
// const redOrbShine = new Image();
// redOrbShine.src = RedShine;

// const whiteOrbIdle = new Image();
// whiteOrbIdle.src = WhiteIdle;
// const whiteOrbShine = new Image();
// whiteOrbShine.src = WhiteShine;

type OrbSprites = {
  [color: string]: {
    idle: HTMLImageElement;
    shine: HTMLImageElement;
    bust: HTMLImageElement;
    bustWidth: number;
    bustHeight: number;
    width: number;
    height: number;
  };
};

export const orbSprites: OrbSprites = {
  green: {
    idle: greenOrbIdle,
    shine: greenOrbShine,
    bust: greenOrbBust,
    bustWidth: greenOrbBust.width / 7 - 1,
    bustHeight: greenOrbBust.height,
    width: greenOrbIdle.width / 3 - 1,
    height: greenOrbIdle.height,
  },
  // yellow: {
  //   idle: yellowOrbIdle,
  //   shine: yellowOrbShine,
  //   width: yellowOrbIdle.width / 3 - 1,
  //   height: yellowOrbIdle.height,
  // },
  // blue: {
  //   idle: blueOrbIdle,
  //   shine: blueOrbShine,
  //   width: blueOrbIdle.width / 3 - 1,
  //   height: blueOrbIdle.height,
  // },
  // purple: {
  //   idle: purpleOrbIdle,
  //   shine: purpleOrbShine,
  //   width: purpleOrbIdle.width / 3 - 1,
  //   height: purpleOrbIdle.height,
  // },
  // red: {
  //   idle: redOrbIdle,
  //   shine: redOrbShine,
  //   width: redOrbIdle.width / 3 - 1,
  //   height: redOrbIdle.height,
  // },
  // white: {
  //   idle: whiteOrbIdle,
  //   shine: whiteOrbShine,
  //   width: whiteOrbIdle.width / 3 - 1,
  //   height: whiteOrbIdle.height,
  // },
};

export const colors = Array.from(Object.keys(orbSprites));
