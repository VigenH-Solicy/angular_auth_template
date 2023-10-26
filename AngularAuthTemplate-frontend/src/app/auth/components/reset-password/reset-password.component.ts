import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { InputTypeEnum } from 'src/app/core/enums/input-type';
import { valueTrimmer } from 'src/app/core/helpers/value-trimmer';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ResetPassword } from 'src/app/core/utils/reactive-forms/forms/reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public inputType: typeof InputTypeEnum = InputTypeEnum;
  public passwordForm: FormGroup = ResetPassword;

  constructor(private readonly authService: AuthService) {}

  public get emailControl(): FormControl {
    return this.passwordForm.controls['email'] as FormControl;
  }

  public resetPassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }

    const resetPasswordForm = valueTrimmer(this.passwordForm.getRawValue());
    this.authService
      .resetPassword(resetPasswordForm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log(error),
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }
}
