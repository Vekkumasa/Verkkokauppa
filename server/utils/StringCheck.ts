export default (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};