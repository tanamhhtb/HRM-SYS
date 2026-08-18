export const DEPARTMENT_API = {
  DEPARTMENT: () => '/api/v1/departments',
  DEPARTMENT_BY_ID: (id: number) => `/api/v1/departments/${id}`,
} as const;