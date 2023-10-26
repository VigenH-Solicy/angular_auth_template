import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, FormControl, Validators } from '@angular/forms';
import { InputTypeEnum } from 'src/app/core/enums/input-type';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputComponent,
      multi: true,
    }
  ],
})
export class InputComponent implements ControlValueAccessor, Validator {

  public value: string = '';

  @Input()
  formControl!: FormControl

  @Input()
  public label: string = 'input label';

  @Input()
  public isRequired: boolean = false;

  @Input()
  public error: ValidationErrors | null | undefined;

  @Input()
  public type: InputTypeEnum = InputTypeEnum.TEXT

  private onChange: Function = () => {};

  public onTouched: Function = () => {};

  public typeEnum: typeof InputTypeEnum = InputTypeEnum;

  public writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    // You can implement this if needed
  }

  public onInputBlur(): void {
    this.onTouched();
  }

  public onInputChange(): void {
    this.onChange(this.value);
    this.onTouched();
  }

  public setRequired(isRequired: boolean): void {
    this.isRequired = isRequired;
  }

  public hasError(error: string): string | boolean {
    return this.formControl.hasError(error)
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isRequired && !this.value) {
      return { required: true };
    }
    return null;
  }
}
