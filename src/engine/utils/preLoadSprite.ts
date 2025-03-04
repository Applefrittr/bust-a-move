export default function preLoadSprite(
  sprite: string
): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = sprite;
  });
}
