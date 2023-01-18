import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
})
export class ApplicationFormComponent implements OnInit {
  public applicationForm!: FormGroup;
  formHalfLenInputs = ['firstName', 'lastName'];
  formFullLenInputs = ['email', 'phone', 'linkedin'];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      firstName: ['d', Validators.required],
      lastName: ['s', Validators.required],
      email: ['t@ww.ww', [Validators.required, Validators.email]],
      phone: [
        'rrrrrrrrrr',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      jobId: ['', Validators.required],
      file: [''],
      // skills: [''],
      linkedin: [''],
    });
  }

  onFileChange(event: any) {
    console.log('event=', event.target);

    if (event.target.value) {
      const file = event.target.value;

      this.applicationForm.patchValue({
        file,
      });
    }
  }

  submitApplication() {
    console.log('me clicked', this.applicationForm.controls);
    console.log('me clicked', this.applicationForm);
  }
}
