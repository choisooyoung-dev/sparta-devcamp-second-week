import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/entities';

export const Role = (...roles: UserRole[]) => SetMetadata('role', roles);
console.log('데코레이터 들어옴!!!!!!');
