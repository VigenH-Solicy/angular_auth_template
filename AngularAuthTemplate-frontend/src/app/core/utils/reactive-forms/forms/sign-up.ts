import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emailValidator } from "../validators/email-validator";
import { symbolValidator, upperCaseValidator } from "../validators/password-validator";

export const SignUp: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      emailValidator()
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      upperCaseValidator(),
      symbolValidator(),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    dateOfBirth: new FormControl('', [Validators.required]),
  });



  