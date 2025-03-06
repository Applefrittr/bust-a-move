import Game from "../engine/Game";
import useDimensions from "../hooks/useDimensions";
import useMaxResolutionScaler from "../hooks/useMaxResolutionScaler";
import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import {
  NATIVERESOLUTION,
  MINRESOLUTIONSCALER,
} from "../engine/utils/constantValues";

export default function App() {
  const [frame, setFrame] = useState(0);
  const { width, height } = useDimensions();
  const maxResolutionScaler = useMaxResolutionScaler(width);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useMemo(() => new Game(width, height), []);
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
    game.width = width;
    game.height = height;

    game.transformScaler = Math.max(
      MINRESOLUTIONSCALER,
      Math.min(
        width / NATIVERESOLUTION.width,
        height / NATIVERESOLUTION.height,
        maxResolutionScaler
      )
    );

    game.transformOrigin = {
      x: (width - NATIVERESOLUTION.width * game.transformScaler) / 2,
      y: (height - NATIVERESOLUTION.height * game.transformScaler) / 2,
    };

    console.log(game.transformScaler);
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
          {width} X {height}
        </p>
      </div>
      <canvas
        className="absolute left-0 top-0 z-0"
        width={width}
        height={height}
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
