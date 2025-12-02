export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  avatarUrl?: string | null;
}
