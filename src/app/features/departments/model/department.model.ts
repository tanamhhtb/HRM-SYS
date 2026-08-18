export interface Department {
  id: number;
  code: string;
  name: string;
  description?: string;
}
export interface DepartmentInput {
  code: string;
  name: string;
  description?: string;
}