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
import LinkBtn from "../components/LinkBtn";
import UIBtn from "../components/UIBtn";
import { OptionsContext } from "../components/Context";

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

      game.setOptions(options);

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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2 z-10 flex gap-2">
          <UIBtn cb={() => game.restart()}>RESTART</UIBtn>
          <LinkBtn to="/" text="HOME"></LinkBtn>
        </div>
      )}
    </main>
  );
}
