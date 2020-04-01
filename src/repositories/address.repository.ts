import {DefaultCrudRepository} from '@loopback/repository';
import {Address, AddressRelations} from '../models';
import {MongoDatasourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.id,
  AddressRelations
> {
  constructor(
    @inject('datasources.mongoDatasource') dataSource: MongoDatasourceDataSource,
  ) {
    super(Address, dataSource);
  }
}
