"use client";

import { useEffect, useState } from "react";
import { LIGHT_MOTION_QUERY } from "@/lib/motion";

export function useLightMotion() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(LIGHT_MOTION_QUERY);
    const update = () => setLight(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return light;
}
