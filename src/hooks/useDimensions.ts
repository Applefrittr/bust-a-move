import { useEffect, useState } from "react";

export default function useDimensions() {
  const [dimensions, setDimensions] = useState({
    width: innerWidth,
    height: innerHeight,
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDimensions({ width: innerWidth, height: innerHeight });
    });
  }, []);
  return dimensions;
}
