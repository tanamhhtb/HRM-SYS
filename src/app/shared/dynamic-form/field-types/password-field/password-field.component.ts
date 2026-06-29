import { Component, input } from "@angular/core";
import { FormfieldConfig } from "../../../models/form-field.model";
import { FormControl } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslatePipe } from'@ngx-translate/core';

@Component({
    selector: 'app-password-field',
    standalone : true,
    imports : [ReactiveFormsModule,TranslatePipe],
    templateUrl :'./password-field.component.html',
})

export class PasswordFieldComponent {
  config = input.required<FormfieldConfig> ();
  control = input.required <FormControl> ();
}