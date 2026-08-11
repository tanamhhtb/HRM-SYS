import { DynamicFieldOption } from './../../models/base-field-config.model';
enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
    Guest = 'GUEST'
}
enum Department {
    It = 'IT',
    Sale = 'SALE',
    Hr = 'HR'
}
enum JobTitle {
    Manager = 'MANAGER',
    Staff = 'STAFF'
}
enum Status {
    Working = 'WORKING',
    Unworking = 'UNWORKING'
}

const USER_ROLE_OPTIONS : DynamicFieldOption<UserRole>[] = [
    { value: UserRole.Admin , label: "Admin"},
    { value: UserRole.User, label: "User"},
    { value: UserRole.Guest, label: "Guest"}
]
const DEPARTMENT_OPTIONS : DynamicFieldOption<Department>[] = 
    Object.entries(Department).map(([key , value]) => ({
        value,
        label: key
    }));    
const STATUS_OPTIONS : DynamicFieldOption<Status>[] =
    Object.entries(Status).map(([key , value]) => ({
        value,
        label: key        
    }));
const JOB_TITLE_OPTIONS : DynamicFieldOption<JobTitle>[] =
    Object.entries(JobTitle).map(([key, value]) => ({
        value,
        label: key
    }));

export {
    DEPARTMENT_OPTIONS, 
    USER_ROLE_OPTIONS,
    STATUS_OPTIONS,
    JOB_TITLE_OPTIONS
};