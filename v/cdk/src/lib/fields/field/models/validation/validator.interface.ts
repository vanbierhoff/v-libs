import { FieldInstanceInterface } from '../field-instance.interface';


export type ValidationError<T = FieldInstanceInterface<any, any>> = {
  error: true,
  errorMessage?: string;
  item: T;
}


export interface ValidatorInterface<I = FieldInstanceInterface> {
  name: string,
  validate: (field: I) => Promise<true | ValidationError>;
}

