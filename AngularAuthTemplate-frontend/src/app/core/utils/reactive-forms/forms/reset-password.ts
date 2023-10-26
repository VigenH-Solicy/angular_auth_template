import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emailValidator } from "../validators/email-validator";

export const ResetPassword: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, emailValidator()]),
  });
