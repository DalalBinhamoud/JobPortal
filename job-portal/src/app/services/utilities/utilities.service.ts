import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldValidationErrDto } from 'src/app/Models/IInputField';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  fieldsMaxLength = {
    name: 40,
    email: 254,
    mobile: 10,
    url: 2000,
    password: 128,
  };

  basicValidationErrs: FieldValidationErrDto[] = [
    { name: 'required', message: 'validation.required' },
    { name: 'maxlength', message: 'validation.maxLength' },
    { name: 'minlength', message: 'validation.minLength' },
    { name: 'mobileNoValidation', message: 'validation.mobileMustStartWith05' },
    { name: 'regexValidator', message: 'validation.unSupportedFormat' },
    { name: 'email', message: 'validation.emailFormat' },
    { name: 'fileTypeValidation', message: 'validation.fileTypeValidation' },
  ];

  mobileNoValidation(control: FormControl) {
    let NIC_REGEX_EN = /^05/; // Regular Expression 1
    let NIC_REGEX_AR = /^\u0660\u0665/; // Regular Expression 2
    return NIC_REGEX_EN.test(control.value) || NIC_REGEX_AR.test(control.value)
      ? null
      : {
          mobileNoValidation: {
            valid: false,
          },
        };
  }

  fileTypeValidation(control: FormControl) {
    const allowedFileExtensions = ['png', 'jpej', 'pdf'];
    const file = control.value;

    if (file) {
      const extension = file.name.split('.');

      return allowedFileExtensions.includes(
        extension[extension.length - 1].toLowerCase()
      )
        ? null
        : {
            fileTypeValidation: {
              valid: false,
            },
          };
    }
    return null;
  }
}
