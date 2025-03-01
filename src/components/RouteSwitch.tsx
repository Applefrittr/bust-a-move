import { HashRouter, Routes, Route } from "react-router";
import App from "../pages/App";
import Home from "../pages/Home";
import Scoreboard from "../pages/Scoreboard";
import TestingSprites from "../pages/TestingSprites";

export default function RouteSwitch() {
  return (
    <main className="h-lvh relative">
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="game" element={<App />} />
          <Route path="scoreboard" element={<Scoreboard />} />
          <Route path="sprites" element={<TestingSprites />} />
        </Routes>
      </HashRouter>
    </main>
  );
}
