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
    default:
      return [];
  }
};
