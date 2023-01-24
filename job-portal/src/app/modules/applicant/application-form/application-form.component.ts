import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FieldValidationErrDto,
  InputFieldDto,
} from 'src/app/Models/IInputField';
import { JobDto } from 'src/app/Models/IJob';
import { JobService } from 'src/app/services/job/job.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
})
export class ApplicationFormComponent implements OnInit {
  public applicationForm!: FormGroup;
  jobs: JobDto[] = [
    { jobNo: 1, name: 'test1' },
    { jobNo: 2, name: 'test2' },
  ];

  basicValidationErrs: FieldValidationErrDto[] = [];

  formHalfLenInputs: InputFieldDto[] = [
    {
      controlName: 'firstName',
      type: 'text',
      maxLength: this.utilities.fieldsMaxLength.name,
    },
    {
      controlName: 'lastName',
      type: 'text',
      maxLength: this.utilities.fieldsMaxLength.name,
    },
  ];
  formFullLenInputs: InputFieldDto[] = [
    {
      controlName: 'email',
      type: 'email',
      maxLength: this.utilities.fieldsMaxLength.email,
    },
    {
      controlName: 'mobile',
      type: 'tel',
      maxLength: this.utilities.fieldsMaxLength.mobile,
      minLength: this.utilities.fieldsMaxLength.mobile,
    },
    {
      controlName: 'linkedin',
      type: 'text',
      maxLength: this.utilities.fieldsMaxLength.url,
      optional: true,
    },
  ];

  onChange!: Function;
  file: File | null = null;
  @ViewChild('resume') resume!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private _jobService: JobService
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
    this.basicValidationErrs = this.utilities.basicValidationErrs;
    this.getJobs();
    this.buildForm();
  }

  getJobs() {
    this._jobService.getJobs().subscribe(
      (res) => {
        this.jobs = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  buildForm() {
    this.applicationForm = this.formBuilder.group({
      firstName: ['d', Validators.required],
      lastName: ['s', Validators.required],
      email: ['t@ww.ww', [Validators.required, Validators.email]],
      mobile: [
        '0506999888',

        [
          Validators.required,
          this.utilities.mobileNoValidation,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      jobId: ['', Validators.required],
      file: ['', [Validators.required, this.utilities.fileTypeValidation]],
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
    console.log('me clicked', this.applicationForm.value);
  }
}
