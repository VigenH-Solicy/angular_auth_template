import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const upperCaseValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const hasUppercaseRegExp = /[A-Z]/;
        if (control.value && !hasUppercaseRegExp.test(control.value)) {
            return { upperCase: true };
          }
        return null
    }
}

export const symbolValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const hasUppercaseRegExp = /[^A-Za-z0-9]/;
        if (control.value && !hasUppercaseRegExp.test(control.value)) {
            return { symbol: true };
          }
        return null
    }
}