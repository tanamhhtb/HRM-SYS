import { MenuItem } from "./models/menu-item.model";

export const MENU_ITEM: MenuItem[] = [
    {labelKey :'LAYOUT.MENU.DASHBOARD', route :'/dashboard'},
    {labelKey :'LAYOUT.MENU.EMPLOYEE', route :'/employee', permission :'EMPLOYEE_VIEW'},
    {labelKey :'LAYOUT.MENU.DEPARTMENT', route :'/department', permission :'DEPARTMENT_VIEW'},
    {labelKey :'LAYOUT.MENU.POSITION', route :'/position', permission :'POSITION_VIEW'},
    {labelKey :'LAYOUT.MENU.ATTENDANCE', route :'/attendance', permission :'ATTENDANCE_VIEW'},
    {labelKey :'LAYOUT.MENU.LEAVE', route :'/leave', permission :'LEAVE_VIEW'},
    {labelKey :'LAYOUT.MENU.PAYROLL', route :'/payroll', permission :'PAYROLL_VIEW'},
    {labelKey :'LAYOUT.MENU.USER', route :'/user', permission :'USER_VIEW'},
    {labelKey :'LAYOUT.MENU.ROLE', route :'/role', permission :'ROLE_VIEW'},
]   