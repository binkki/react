export type FormFields = {
  name: string;
  age: number;
  email: string;
  password: string;
  password_copy: string;
  gender: string;
  terms: boolean | undefined;
  image: FileList;
  country: string;
};

export type FormResultType = {
  name: string;
  age: number;
  email: string;
  password: string;
  password_copy: string;
  gender: string;
  terms: boolean;
  image: string;
  country: string;
};

export type AppSliceType = {
  uncontrolledFormResults: FormResultType[];
  reacthookformResults: FormResultType[];
  countries: string[];
  password: string;
  password_copy: string;
};

export type FormErrors = {
  [field: string]: string;
};

export enum PassStrengthEnum {
  NONE = 'strength-transparent',
  LOW = 'strength-red',
  MID = 'strength-orange',
  STRONG = 'strength-green',
}