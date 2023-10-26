import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const emailValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegExp =
      /^[a-zA-Z0-9._%+-]{5,}@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|localhost)$/;
    if (control.value && !emailRegExp.test(control.value)) {
      return { invalidEmail: 'Incorrect email' };
    }
    return null;
  };
};
