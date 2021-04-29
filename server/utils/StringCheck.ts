export const StringCheck = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const StringParser = (text: unknown): string => {
  if (!text || !StringCheck(text)) {
      throw new Error(`Incorrect or missing string ` + text);
  }
  return text;
};