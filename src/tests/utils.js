export const getRandom = (
  type = "float",
  size = 10,
  min = 1.0,
  max = 100.0
) => {
  switch (type) {
    case "float":
      return [...new Array(size)].map(() => min + Math.random() * (max - min));
    case "int":
      return [...new Array(size)].map(
        () => min + Math.round(Math.random() * (max - min))
      );
    case "string":
      return [...Array(size)].map(() =>
        [...Array(~~(Math.random() * size + 3))]
          .map(() => String.fromCharCode(Math.random() * (123 - 97) + 97))
          .join("")
      );
    default:
      return [];
  }
};

export const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const randomMean = (
  type = "float",
  size = 10,
  min = 1.0,
  max = 100.0
) => {
  let y = null;
  let sum = null;
  let mean = null;
  switch (type) {
    case "float":
      y = [...new Array(size)].map(() => min + Math.random() * (max - min));
      sum = y.reduce((a, b) => a + b, 0);
      mean = sum / size;
      return [y, mean];
    case "int":
      y = [...new Array(size)].map(
        () => min + Math.round(Math.random() * (max - min))
      );
      sum = y.reduce((a, b) => a + b, 0);
      mean = sum / size;
      return [y, mean];
    default:
      return [];
  }
};
