import { ValidatorFn } from '@angular/forms';
export interface DynamicFieldOption {
    label : string;
    value : any;
}
export interface  BaseFieldConfig{
    name : string;
    label : string;
    placeholder ?: string;
    options ?: DynamicFieldOption[];
    validators ?: ValidatorFn[];
    errorMessage ?: {
        required ?: string;
        minLength ?: string;
        pattern ?: string;
    }
}
