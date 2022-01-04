export const createImgPath = (
  id: string,
  isFull?: boolean,
  option?: "w300"
) => {
  if (isFull) {
    return `https://image.tmdb.org/t/p/original${id}`;
  } else if (option) {
    return `https://image.tmdb.org/t/p/${option}${id}`;
  } else {
    return `https://image.tmdb.org/t/p/w500${id}`;
  }
};
