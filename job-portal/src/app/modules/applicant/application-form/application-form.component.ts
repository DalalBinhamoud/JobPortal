import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
})
export class ApplicationFormComponent implements OnInit {
  public applicationForm!: FormGroup;
  formHalfLenInputs = ['firstName', 'lastName'];
  formFullLenInputs = ['email', 'phone', 'linkedin'];
  mobileValidationErrors: { name: string; message: string }[] = [];

  onChange!: Function;
  file: File | null = null;
  @ViewChild('resume') resume!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService
  ) {}

  handleFileInput(target: HTMLInputElement | null | any) {
    this.applicationForm.controls['file'].markAsTouched();
    console.log(target.files[0]);

    this.file = target.files[0];
    this.applicationForm.patchValue({
      file: this.file,
    });
  }

  ngOnInit(): void {
    this.mobileValidationErrors = this.utilities.mobileValidationErrors;
    this.applicationForm = this.formBuilder.group({
      firstName: ['d', Validators.required],
      lastName: ['s', Validators.required],
      email: ['t@ww.ww', [Validators.required, Validators.email]],
      phone: [
        'rrrrrrrrrr',

        [
          Validators.required,
          this.utilities.mobileNoValidation,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      jobId: ['', Validators.required],
      file: ['', Validators.required],
      // skills: [''],
      linkedin: [''],
    });
  }

  removeUploadedFile() {
    this.applicationForm.patchValue({
      file: null,
    });
    this.file = null;
    this.resume.nativeElement.value = null; // clear input
  }

  submitApplication() {
    console.log('me clicked', this.applicationForm.controls);
    console.log('me clicked', this.applicationForm);
  }
}
