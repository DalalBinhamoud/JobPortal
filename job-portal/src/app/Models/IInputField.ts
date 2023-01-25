export interface InputFieldDto {
  controlName: string;
  type: 'text' | 'tel' | 'email';
  maxLength: number;
  minLength?: number;
  optional?: Boolean;
}

export interface FieldValidationErrDto {
  name: string;
  message: string;
}
