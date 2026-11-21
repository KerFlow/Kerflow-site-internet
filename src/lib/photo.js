// Shared by the CMS preview and the public site: one crop has one rendering rule.
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
export function readCrop(crop = {}) {
  const number = (value, fallback) => typeof value === 'number' && Number.isFinite(value) ? value : fallback;
  return {
    x: clamp(number(crop?.x, 50), 0, 100),
    y: clamp(number(crop?.y, 50), 0, 100),
    zoom: clamp(number(crop?.zoom, 1), 1, 3),
  };
}
export function cropImageStyle(value) {
  const { x, y, zoom } = readCrop(value);
  return {
    objectFit: 'cover', objectPosition: `${x}% ${y}%`,
    transform: `scale(${zoom})`, transformOrigin: `${x}% ${y}%`,
  };
}
export function cropStyle(value) {
  const { x, y, zoom } = readCrop(value);
  return `object-fit:cover;object-position:${x}% ${y}%;transform:scale(${zoom});transform-origin:${x}% ${y}%;`;
}
export function panCrop(value, dx, dy, frame, image) {
  const crop = readCrop(value);
  const scale = Math.max(frame.width / image.width, frame.height / image.height) * crop.zoom;
  const overflowX = image.width * scale - frame.width;
  const overflowY = image.height * scale - frame.height;
  return {
    ...crop,
    x: overflowX > 0.01 ? clamp(crop.x - dx / overflowX * 100, 0, 100) : crop.x,
    y: overflowY > 0.01 ? clamp(crop.y - dy / overflowY * 100, 0, 100) : crop.y,
  };
}
export function withPhoto(record) {
  if (!record?.photo) return record;
  return {
    ...record,
    image: record.photo.image,
    imageCrops: record.photo.crops,
    wide: record.photo.wide ?? record.wide,
  };
}
