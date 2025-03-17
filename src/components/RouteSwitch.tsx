import { HashRouter, Routes, Route } from "react-router";
import GameCanvas from "../pages/GameCanvas";
import Home from "../pages/Home";
import Options from "../pages/Options";
import Scoreboard from "../pages/Scoreboard";
import { OptionsContext, UpdateOptionsParamObj } from "./Context";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RouteSwitch() {
  const options = {
    sfx: true,
    music: true,
    mobileUI: true,
    left: "a",
    right: "d",
    fire: " ",
    updateOptions(updates: UpdateOptionsParamObj) {
      this.sfx = updates.sfx ?? this.sfx;
      this.music = updates.music ?? this.music;
      this.mobileUI = updates.mobileUI ?? this.mobileUI;
      this.left = updates.left ?? this.left;
      this.right = updates.right ?? this.right;
      this.fire = updates.fire ?? this.fire;
    },
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <OptionsContext.Provider value={options}>
          <HashRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="game" element={<GameCanvas />} />
              <Route path="options" element={<Options />} />
              <Route path="scoreboard" element={<Scoreboard />} />
            </Routes>
          </HashRouter>
        </OptionsContext.Provider>
      </QueryClientProvider>
    </>
  );
}
