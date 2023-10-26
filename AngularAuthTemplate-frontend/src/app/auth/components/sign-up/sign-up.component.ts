import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  Subject,
  catchError,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import * as day from 'dayjs';
import { HttpStatus } from 'src/app/core/enums/http-status';
import { IResponse } from 'src/app/core/interfaces/response';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UploadService } from 'src/app/core/services/upload/upload.service';
import { SignUp } from 'src/app/core/utils/reactive-forms/forms/sign-up';
import { InputTypeEnum } from 'src/app/core/enums/input-type';
import { valueTrimmer } from 'src/app/core/helpers/value-trimmer';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  private selectedImage!: File;
  public signUpForm: FormGroup = SignUp;
  public inputType: typeof InputTypeEnum = InputTypeEnum;
  constructor(
    private readonly authService: AuthService,
    private readonly uploadService: UploadService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {
    this.passowrdChecker();
  }

  public get nameControl(): FormControl {
    return this.signUpForm.controls['name'] as FormControl;
  }

  public get surnameControl(): FormControl {
    return this.signUpForm.controls['surname'] as FormControl;
  }

  public get emailControl(): FormControl {
    return this.signUpForm.controls['email'] as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.signUpForm.controls['password'] as FormControl;
  }

  public get rePasswordControl(): FormControl {
    return this.signUpForm.controls['rePassword'] as FormControl;
  }

  public get dateOfBirthControl(): FormControl {
    return this.signUpForm.controls['dateOfBirth'] as FormControl;
  }

  public maxDate(): Date {
    return new Date();
  }

  public signUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    const formData = valueTrimmer(this.signUpForm.getRawValue());

    if (this.selectedImage) {
      const imageData = new FormData();
      imageData.append('file', this.selectedImage);
      this.uploadService
        .upload(imageData)
        .pipe(
          takeUntil(this.unsubscribe$),
          switchMap((event) => {
            formData.image = event.data.data;
            return this.signUpObservable(formData).pipe(
              catchError((error) => {
                return throwError(() => new Error(error));
              })
            );
          })
        )
        .subscribe({
          next: (res) => {
            if (
              res.data.code === HttpStatus.OK ||
              res.data.code === HttpStatus.CREATED
            ) {
              this.redirectSignIn();
            }
          },
          error: (error) => console.log(error),
        });
    } else {
      this.signUpObservable(formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            if (
              res.data.code === HttpStatus.OK ||
              res.data.code === HttpStatus.CREATED
            ) {
              this.redirectSignIn();
            }
          },
          error: (error) => {
            this.emailControl.setErrors({
              userExists: error.error.data.messages,
            });
          },
        });
    }
  }

  public onFileSelectedEmitter(event: File | null): void {
    if (!event) return;
    this.selectedImage = event;
    localStorage.setItem('image', JSON.stringify(this.selectedImage));
  }

  private signUpObservable(body: IUser): Observable<IResponse<IUser>> {
    return this.authService.signUp(body);
  }

  private redirectSignIn(): void {
    this.toastrService.success('Registration success');
    this.router.navigate(['/auth/sign-in']);
  }

  private passowrdChecker(): void {
    this.signUpForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (formControls) => {
        formControls.dateOfBirth = day(formControls.dateOfBirth).format(
          'DD/MM/YYYY'
        );
        if (formControls.rePassword !== formControls.password) {
          this.rePasswordControl.setErrors({ match: "password doesn't match" });
        }
      },
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }
}
