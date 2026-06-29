import { ValidatorFn } from "@angular/forms";

export interface FormfieldConfig{
    name : string;
    type : 'text' | 'password' | 'select' | 'date';
    label : string;
    placeholder : string;
    validators ?: ValidatorFn[];
    errorMessage ?:{
        required ?: string;
        minLenght ?: string;
    }    
}