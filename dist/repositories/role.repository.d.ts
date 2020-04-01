import { DefaultCrudRepository } from '@loopback/repository';
import { Role, RoleRelations } from '../models';
import { MongoDatasourceDataSource } from '../datasources';
export declare class RoleRepository extends DefaultCrudRepository<Role, typeof Role.prototype.id, RoleRelations> {
    constructor(dataSource: MongoDatasourceDataSource);
}
