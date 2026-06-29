import { Component, effect, input, output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormfieldConfig } from "../models/form-field.model";
import { TextFieldComponent } from "./field-types/text-field/text-field.component";
import { PasswordFieldComponent } from "./field-types/password-field/password-field.component";

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ ReactiveFormsModule,TextFieldComponent,PasswordFieldComponent ],
  templateUrl:'./dynamic-form.component.html'
})
export class DynamicFormComponent {
fields = input.required<FormfieldConfig[]>();
formSubmit = output<Record<string, any>>();
form = new FormGroup({});
submitLabel = input<string>('Submit');
isLoading = input<boolean>(false);

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