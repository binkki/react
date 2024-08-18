import {
  textLowerPattern,
  textNumberPattern,
  textSymbolPattern,
  textUpperPattern,
} from './constants';

export const convertImage = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const testRegex = (template: RegExp, password: string): number => {
  if (template.test(password)) return 1;
  return 0;
};

export const getPasswordStrength = (password: string): number => {
  return (
    testRegex(textSymbolPattern.regex, password) +
    testRegex(textNumberPattern.regex, password) +
    testRegex(textLowerPattern.regex, password) +
    testRegex(textUpperPattern.regex, password)
  );
};
