import useDimensions from "./hooks/useDimensions";
import Game from "./engine/Game";
import { useRef, useEffect, useMemo } from "react";

function App() {
  const { width, height } = useDimensions();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useMemo(() => new Game(), []);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      game.setContext(ctx);
      game.start();
    }
    return () => {
      game.stop();
    };
  }, []);

  return (
    <main className="relative">
      <div className="relative z-10">
        <p className="p-10 font-bold">Hello World</p>
        <button
          onClick={() => game.togglePause()}
          className="p-10 bg-amber-50 text-black"
        >
          pause
        </button>
      </div>
      <canvas
        className="absolute left-0 top-0 z-0"
        width={width}
        height={height}
        ref={canvasRef}
      />
    </main>
  );
}

export default App;
