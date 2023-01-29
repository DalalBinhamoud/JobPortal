import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FieldValidationErrDto,
  InputFieldDto,
} from 'src/app/Models/IInputField';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  basicValidationErrs: FieldValidationErrDto[] = [];

  formFullLenInputs: InputFieldDto[] = [
    {
      controlName: 'email',
      type: 'email',
      maxLength: this.utilities.fieldsMaxLength.email,
    },
    {
      controlName: 'password',
      type: 'password',
      maxLength: this.utilities.fieldsMaxLength.password,
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {}
}
