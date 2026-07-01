import { BaseFieldConfig } from "../base-field-config.model";
export interface TextField extends BaseFieldConfig {
    type: 'text' | 'tel' | 'number';
    pattern ?: RegExp;
}

