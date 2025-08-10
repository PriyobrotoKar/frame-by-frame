import { Role } from '@frame-by-frame/db';

export type JwtPayload = {
  id: string;
  email: string;
  role: Role;
};
