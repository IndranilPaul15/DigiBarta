export const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[\u2019’]/g, "") // remove curly quotes
    .replace(/[^a-z0-9\s-]/g, "") // remove symbols
    .trim()
    .replace(/\s+/g, "-"); // replace spaces with -
