import { Credentials } from '../auth';
import { User } from '../models';
import { UserRepository, UserRoleRepository } from '../repositories';
export declare class UserController {
    private userRepository;
    private userRoleRepository;
    constructor(userRepository: UserRepository, userRoleRepository: UserRoleRepository);
    createUser(user: User): Promise<User>;
    login(credentials: Credentials): Promise<{
        token: any;
        id: string;
        email: string;
        roles: string[];
    }>;
}
