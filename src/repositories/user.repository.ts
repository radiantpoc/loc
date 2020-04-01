import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDatasourceDataSource} from '../datasources';
import {User} from '../models';

export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id>
// UserRelations
{
  constructor(@inject('datasources.mongoDatasource') dataSource: MongoDatasourceDataSource) {
    super(User, dataSource);
  }
}
