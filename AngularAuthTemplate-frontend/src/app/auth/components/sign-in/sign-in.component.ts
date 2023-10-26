import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { HttpStatus } from 'src/app/core/enums/http-status';
import { InputTypeEnum } from 'src/app/core/enums/input-type';
import { valueTrimmer } from 'src/app/core/helpers/value-trimmer';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { SignIn } from 'src/app/core/utils/reactive-forms/forms/sign-in';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public signInForm: FormGroup = SignIn;
  public inputType: typeof InputTypeEnum = InputTypeEnum;
  public error!: string;
  
  constructor(
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly toastrService: ToastrService,
  ) {}

  public get emailControl(): FormControl {
    return this.signInForm.controls['email'] as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.signInForm.controls['password'] as FormControl;
  }

  public signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }
    const formData = valueTrimmer(this.signInForm.getRawValue());
    this.authService
      .signIn(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.storageService.setItem('auth_token', res.data.data);
          this.router.navigate(['/app']);
        },
        error: (error) => {
          if (error.error.data.code === HttpStatus.BAD_REQUEST) {
            this.error = error.error.data.messages;
          } else {
            this.toastrService.error('No user found')
          }
        },
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }
}
