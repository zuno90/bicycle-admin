export const formatNumber = (x: number) => {
  return Math.round(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
