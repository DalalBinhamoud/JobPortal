import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationDto } from 'src/app/Models/IApplication';
import {
  FieldValidationErrDto,
  InputFieldDto,
} from 'src/app/Models/IInputField';
import { LookupDto } from 'src/app/Models/ILookup';
import { ApplicationService } from 'src/app/services/application/application.service';
import { FileService } from 'src/app/services/file/file.service';
import { LookupService } from 'src/app/services/lookup/lookup.service';

import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
})
export class ApplicationFormComponent implements OnInit {
  public applicationForm!: FormGroup;
  jobs: LookupDto[] = [
    //mock
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' },
  ];
  skills: LookupDto[] = [
    //mock
    { id: 1, name: 'data1', selected: false },
    { id: 2, name: 'data2', selected: false },
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
    private _lookupSvc: LookupService,
    private _applicationService: ApplicationService,
    private _fileService: FileService
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
    this.getSkills();
    this.buildForm();
  }

  getJobs() {
    this._lookupSvc.getJobs().subscribe(
      (res: LookupDto[]) => {
        this.jobs = res;
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  getSkills() {
    this._lookupSvc.getSkills().subscribe(
      (res: LookupDto[]) => {
        this.skills = res;
      },
      (err: Error) => {
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
      skills: [''],
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

  getSelectedSkills(items: LookupDto[]) {
    const selectedSkills = items?.filter((item) => item.selected);

    this.applicationForm.patchValue({
      skills: selectedSkills,
    });
  }

  submitApplication() {
    const formData = new FormData();
    formData.append('resume', this.applicationForm.value?.file);

    this._applicationService
      .submitApplication(this.applicationForm.value)
      .subscribe(
        (res: any) => {
          formData.append('applicationId', res.id);
          this._fileService.uploadFile(formData).subscribe(
            (res) => {
              //TODO call success message
            },
            (error) => {}
          );
        },
        (error) => {}
      );
  }
}
