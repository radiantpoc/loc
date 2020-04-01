import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDatasourceDataSource } from '../datasources';
import { User } from '../models';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {
    constructor(dataSource: MongoDatasourceDataSource);
}
