export interface Role {
  id: number;
  code: string;
  name: string;
}
export interface Employee {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phone?: string;
  departmentId: number;
  positionId: number;
  status: string;
}
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  employeeId: number;
  roleId: number;
  enabled: boolean;
  role: Role | null;
  permissions: string[];
  employee: Employee | null;
  lastLoginAt : string | null;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: AuthUser;
}