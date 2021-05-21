export const platformParser = (name: string | undefined, family: string | undefined, version: string | undefined): string => {
  let string = '';
  if (name) {
    string += name + ' ';
  } else {
    string += 'unknown name ';
  }
  if (family) {
    string += family + ' ';
  } else {
    string += 'unknown os ';
  }
  if (version) {
    string += version;
  } else {
    string += 'unknown version ';
  }

  return string;
};