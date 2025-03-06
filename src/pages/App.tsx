import Game from "../engine/Game";
import useDimensions from "../hooks/useDimensions";
import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { delay } from "../engine/utils/constantValues";
import { NATIVERESOLUTION } from "../engine/utils/constantValues";

export default function App() {
  const [frame, setFrame] = useState(0);
  const { width, height } = useDimensions();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useMemo(() => new Game(1), []);
  const syncReactFrames = useCallback(
    () => setFrame(requestAnimationFrame(syncReactFrames)),
    []
  );

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      game.setContext(ctx);
      game.start();

      syncReactFrames();
    }
    return () => {
      game.stop();
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (game.lvlComplete) {
      cancelAnimationFrame(frame);
      setTimeout(() => {
        syncReactFrames();
      }, delay);
    }
    if (game.gameOverFlag) {
      cancelAnimationFrame(frame);
    }
  }, [game.lvlComplete, game.gameOverFlag]);

  useEffect(() => {
    game.scale = Math.min(
      width / NATIVERESOLUTION.width,
      height / NATIVERESOLUTION.height
    );

    game.origin = {
      x: (width - NATIVERESOLUTION.width * game.scale) / 2,
      y: (height - NATIVERESOLUTION.height * game.scale) / 2,
    };
  }, [width, height]);

  return (
    <>
      <div className="relative z-10">
        <p className="p-10 font-bold">Hello World</p>
        <button
          onClick={() => game?.togglePause()}
          className="p-10 bg-amber-50 text-black"
        >
          pause
        </button>
        <p>{game.score}</p>
        <p>
          {innerWidth} X {innerHeight}
        </p>
      </div>
      <canvas
        className="absolute left-0 top-0 z-0"
        width={innerWidth}
        height={innerHeight}
        ref={canvasRef}
      />
      {game.lvlComplete && (
        <h1 className="absolute left-1/2 top-1/2 -translate-1/2 z-10 bg-amber-50 text-black p-2">
          <b>LEVEL COMPLETE</b>
        </h1>
      )}
      {game.gameOverFlag && (
        <h1 className="absolute left-1/2 top-1/2 -translate-1/2 z-10 bg-amber-50 text-black p-2">
          <b>Game Over!</b>
        </h1>
      )}
    </>
  );
}
