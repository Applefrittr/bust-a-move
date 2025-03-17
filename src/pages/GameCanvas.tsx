import Game from "../engine/Game";
import useDimensions from "../hooks/useDimensions";
import useMaxResolutionScaler from "../hooks/useMaxResolutionScaler";
import {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useContext,
} from "react";
import { NATIVERESOLUTION } from "../engine/utils/constantValues";
import GameUI from "../components/GameUI";
import { OptionsContext } from "../components/Context";
import GameOverModal from "../components/GameOverModal";
import PauseModal from "../components/PauseModal";

export default function GameCanvas() {
  const [frame, setFrame] = useState(0);
  const { width, height } = useDimensions();
  const maxResolutionScaler = useMaxResolutionScaler(width);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useMemo(() => new Game(width, height), []);
  const syncReactFrames = useCallback(
    () => setFrame(requestAnimationFrame(syncReactFrames)),
    []
  );
  const options = useContext(OptionsContext);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      game.setContext(ctx);

      if (options) game.setOptions(options);

      game.start();
      game.animationLoop();

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

    game.transformScaler = Math.min(
      width / NATIVERESOLUTION.width,
      height / NATIVERESOLUTION.height,
      maxResolutionScaler
    );

    game.transformOrigin = {
      x: (width - NATIVERESOLUTION.width * game.transformScaler) / 2,
      y: (height - NATIVERESOLUTION.height * game.transformScaler) / 2,
    };
  }, [width, height]);

  return (
    <main className="h-dvh relative">
      <GameUI game={game} />
      <canvas
        className="absolute left-0 top-0 z-0"
        width={width}
        height={height}
        ref={canvasRef}
      />
      {game.gameOverFlag && (
        <GameOverModal
          game={game}
          frame={frame}
          syncReactFrames={syncReactFrames}
        />
      )}
      {game.paused && <PauseModal game={game} />}
    </main>
  );
}
