import { UserType } from '../types';

export const StringCheck = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const UserTypeParser = (text: unknown): text is UserType => {
  if (!text || !StringCheck(text)) {
      throw new Error(`Incorrect or missing string ` + text);
  }

  if (text === 'Admin' || text === 'User') {
    return true;
  }
  return false;
};