export const createImgPath = (
  id: string,
  size: "w300" | "w500" | "original" = "w300"
) => {
  if (id) return `https://image.tmdb.org/t/p/${size}${id}`;
  else return require("assets/notfound.jpeg").default;
};
