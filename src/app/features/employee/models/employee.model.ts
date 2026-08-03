import { Gender , EmployeeStatus , PositionLevel } from "../../../core/models/enum.model";

export interface Employee {
  id: number;
  employeeCode: string;
  fullName: string;
  gender: Gender;
  dateOfBirth: string;
  email: string;
  phone: string;
  departmentId: number;
  positionId: number;
  joinDate: string;
  salary: number;
  status: EmployeeStatus;
}
export interface Department {
    id: number;
    code: string;
    name: string;
    description: string;
}
export interface Position {
    id: number;
    code: string;
    name: string;
    level: PositionLevel
}

export interface EmployeeListViewModel {
    employeeCode: string;
    fullName: string;
    email: string;
    departmentName: string;
    positionName: string;
    salary: number;
    status: EmployeeStatus
}