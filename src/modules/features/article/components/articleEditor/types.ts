export type Inputs = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: { value: string }[];
  tag: string;
};

export type FormState = {
  errors: {
    title?: string[];
    description?: string[];
    body?: string[];
    tagList?: string[];
  };
};

export const initialFormState: FormState = {
  errors: {},
};
