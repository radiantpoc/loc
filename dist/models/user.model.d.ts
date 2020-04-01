import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    fullname: string;
    id?: string;
    email: string;
    password: string;
    [prop: string]: any;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;
