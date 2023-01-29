import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import {
  FieldValidationErrDto,
  InputFieldDto,
} from 'src/app/Models/IInputField'
import { AuthService } from 'src/app/services/auth/auth.service'
import { UtilitiesService } from 'src/app/services/utilities/utilities.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  basicValidationErrs: FieldValidationErrDto[] = []

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
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilities: UtilitiesService,
    private _authSvc: AuthService,
  ) {}

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    console.log('track=1')
    this.router.navigate(['/admin/applications'])

    this._authSvc.login(this.loginForm.value).subscribe(
      (res) => {
        this.router.navigate(['/admin/applications'])
      },
      (error) => {},
    )
  }
}
