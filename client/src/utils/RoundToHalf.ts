export const roundToHalf = (value: number): number => {
  const converted = `${value}`;
  let decimal = (value - parseInt(converted, 10));
  decimal = Math.round(decimal * 10);
  if (decimal === 5) {
    return parseInt(converted, 10) + 0.5;
  } else if (decimal < 3 || decimal > 7) {
    return Math.round(value);
  } else {
    return parseInt(converted, 10) + 0.5;
  }
};