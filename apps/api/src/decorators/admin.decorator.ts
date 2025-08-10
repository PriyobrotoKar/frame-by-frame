import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'isAdmin';
const Admin = () => SetMetadata(IS_ADMIN_KEY, true);

export default Admin;
