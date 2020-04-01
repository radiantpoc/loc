import { DefaultCrudRepository } from '@loopback/repository';
import { Address, AddressRelations } from '../models';
import { MongoDatasourceDataSource } from '../datasources';
export declare class AddressRepository extends DefaultCrudRepository<Address, typeof Address.prototype.id, AddressRelations> {
    constructor(dataSource: MongoDatasourceDataSource);
}
