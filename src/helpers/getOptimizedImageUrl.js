// the image given by the backend is large, so optimizing the image for smaller size
export const getOptimizedImageUrl = (url, width = 40) => {
  if (!url) return "";

  return url.replace(/(\.(jpg|png|jpeg|webp))/, `_${width}x$1`);
};
