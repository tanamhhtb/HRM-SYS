import { TableColumn } from "../../../shared/models/table.model";
import { Employee } from "../models/employee.model";

export const EMPLOYEE_COLUMNS: TableColumn<Employee>[] = [
  { key: 'id', label: 'API.EMPLOYEE.ID' },
  { key: 'employeeCode', label: 'API.EMPLOYEE.EMPLOYEE_CODE' },
  { key: 'fullName', label: 'API.EMPLOYEE.FULL_NAME' },
  { key: 'gender', label: 'API.EMPLOYEE.GENDER' },
  { key: 'email', label: 'API.EMPLOYEE.EMAIL' },
  { key: 'phone', label: 'API.EMPLOYEE.PHONE' },
  { key: 'status', label: 'API.EMPLOYEE.STATUS' }
];