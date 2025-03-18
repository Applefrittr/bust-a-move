export const DELAY = 5000;

export const GRAVITYPERFRAME = 9.8 / (1000 / 60);

export const NATIVERESOLUTION = {
  width: 256,
  height: 224,
};

export const ORBRADIUS = 8;

export const MAXRESOLUTIONSCALER = {
  HD: 3,
  "2K": 4,
  "4K": 5,
};

export const SHRINKRATE = 0.05;

export const ORBSPEED = 6;

export const LEVELS = [
  ["green", "blue"],
  ["purple", "white"],
  ["white", "red", "blue"],
  ["purple", "yellow", "green"],
  ["red", "purple", "white", "green"],
  ["blue", "yellow", "white", "red"],
  ["green", "blue", "red", "white", "yellow"],
  ["purple", "yellow", "green", "red", "blue", "white"],
];
