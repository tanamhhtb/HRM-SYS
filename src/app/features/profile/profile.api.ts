export const PROFILE_API = {
  DEPARTMENT: (id: number) => `/api/v1/departments/${id}`,
  POSITION: (id: number) => `/api/v1/positions/${id}`,
} as const;