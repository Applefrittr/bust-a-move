import { HashRouter, Routes, Route } from "react-router";
import GameCanvas from "../pages/GameCanvas";
import Home from "../pages/Home";
import Options from "../pages/Options";
import Scoreboard from "../pages/Scoreboard";
import { OptionsContext, OptionsObj } from "./Context";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RouteSwitch() {
  const [options, setOptions] = useState<OptionsObj>({
    sfx: true,
    music: true,
    mobileUI: true,
    left: "a",
    right: "d",
    fire: " ",
  });

  const updateOptions = (options: OptionsObj) => {
    setOptions(options);
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <OptionsContext.Provider value={options}>
          <HashRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="game" element={<GameCanvas />} />
              <Route
                path="options"
                element={<Options updateOptions={updateOptions} />}
              />
              <Route path="scoreboard" element={<Scoreboard />} />
            </Routes>
          </HashRouter>
        </OptionsContext.Provider>
      </QueryClientProvider>
    </>
  );
}
