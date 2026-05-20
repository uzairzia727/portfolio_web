/** Match touch / narrow viewports where heavy motion hurts scroll performance. */
export const LIGHT_MOTION_QUERY =
  "(max-width: 767px), (prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)";

export function matchesLightMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(LIGHT_MOTION_QUERY).matches;
}
