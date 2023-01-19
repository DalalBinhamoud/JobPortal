import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  mobileValidationErrors = [
    { name: 'required', message: 'MobileReq' },
    { name: 'maxlength', message: 'MobileLimitHigh' },
    { name: 'minlength', message: 'MobileLimitLow' },
    { name: 'mobileNoValidation', message: 'PhoneNumberMustStartWith05' },
    { name: 'regexValidator', message: 'UnSupportedFormat' },
  ];
  constructor() {}

  mobileNoValidation(c: FormControl) {
    let NIC_REGEX_EN = /^05/; // Regular Expression 1
    let NIC_REGEX_AR = /^\u0660\u0665/; // Regular Expression 2
    return NIC_REGEX_EN.test(c.value) || NIC_REGEX_AR.test(c.value)
      ? null
      : {
          mobileNoValidation: {
            valid: false,
          },
        };
  }
}
