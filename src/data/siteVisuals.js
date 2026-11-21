import rawVisuals from "./siteVisuals.json";
import { withPhoto } from "../lib/photo.js";
const normalize = (value) => {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") {
    if ("visualMode" in value) return withPhoto(value);
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalize(item)]));
  }
  return value;
};
export const siteVisuals = normalize(rawVisuals);
