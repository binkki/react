export type FormFields = {
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
  uncontrolledFormResults: FormFields[];
  reacthookformResults: FormFields[];
  countries: string[];
};
