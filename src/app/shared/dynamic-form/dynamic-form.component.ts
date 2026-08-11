import { Component, effect, input, output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { TranslatePipe } from "@ngx-translate/core";

import { FieldConfig } from "../models/field-config.model";
import { TextFieldComponent } from "./field-types/text-field/text-field.component";
import { CheckboxFieldComponent } from "./field-types/checkbox-field/checkbox-field.component";
import { PasswordFieldComponent } from "./field-types/password-field/password-field.component";
import { RadioFieldComponent } from "./field-types/radio-field/radio-field.component";
import { EmailFieldComponent } from "./field-types/email-field/email-field.component";
import { SelectFieldComponent } from "./field-types/select-field/select-field.component";
import { DateFieldComponent } from "./field-types/date-field/date-field.component";
import { TextareaFieldComponent } from "./field-types/textarea-field/textarea-field.component";
import { SearchFieldComponent } from "./field-types/search-field/search-field.component";

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    TranslatePipe,
    CommonModule,

    
    TextFieldComponent,
    PasswordFieldComponent,
    CheckboxFieldComponent,
    RadioFieldComponent,
    EmailFieldComponent,
    SelectFieldComponent,
    DateFieldComponent,
    TextareaFieldComponent,
    SearchFieldComponent
  ],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {
  fields = input.required<FieldConfig[]>();
  formSubmit = output<Record<string, any>>();
  form = new FormGroup({});
  submitLabel = input<string>('');
  buttonClass = input<string>('');
  formClass = input<string>('');
  constructor() {
    effect(() => {
      this.fields().forEach(field => {
        this.form.addControl(
          field.name,
          new FormControl('', field.validators ?? [])
        );
      });
    });
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.formSubmit.emit(this.form.value);
  }
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
