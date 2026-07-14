import { DynamicFieldOption } from "../models/base-field-config.model";

export enum AcountStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export const ACOUNT_STATUS_OPTION : DynamicFieldOption<AcountStatus>[] = [
    { value: AcountStatus.ACTIVE, label: 'Active'},
    { value: AcountStatus.INACTIVE, label: 'Inactive'}
]