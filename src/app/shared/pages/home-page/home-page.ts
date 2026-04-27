import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../utils/form-utils';

@Component({
  selector: 'app-home-page',
  imports: [ReactiveFormsModule],
  templateUrl: './home-page.html',
})
export class HomePage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)], []],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit(){
    this.loginForm.markAllAsTouched();
  }

 }
