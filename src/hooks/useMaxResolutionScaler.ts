import { useState, useEffect } from "react";
import { MAXRESOLUTIONSCALER } from "../engine/utils/constantValues";

export default function useMaxResolutionScaler(width: number) {
  const [scaler, setScaler] = useState(MAXRESOLUTIONSCALER.HD);

  useEffect(() => {
    if (width < 2000) setScaler(MAXRESOLUTIONSCALER.HD);
    else if (width >= 2000 && width < 3000)
      setScaler(MAXRESOLUTIONSCALER["2K"]);
    else setScaler(MAXRESOLUTIONSCALER["4K"]);
  }, [width]);
  return scaler;
}
