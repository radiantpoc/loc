import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {promisify} from 'util';
import {Credentials, JWT_SECRET} from '../auth';
import {User} from '../models';
import {UserRepository, UserRoleRepository} from '../repositories';

const {sign} = require('jsonwebtoken');
const signAsync = promisify(sign);

export class UserController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserRoleRepository) private userRoleRepository: UserRoleRepository,
  ) {}

  @post('/users')
  async createUser(@requestBody() user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  @post('/users/login')
  async login(@requestBody() credentials: Credentials) {
    if (!credentials.username || !credentials.password) throw new HttpErrors.BadRequest('Missing Username or Password');
    const user = await this.userRepository.findOne({where: {id: credentials.username}});
    if (!user) throw new HttpErrors.Unauthorized('Invalid credentials');

    const isPasswordMatched = user.password === credentials.password;
    if (!isPasswordMatched) throw new HttpErrors.Unauthorized('Invalid credentials');

    const tokenObject = {username: credentials.username};
    const token = await signAsync(tokenObject, JWT_SECRET);
    const roles = await this.userRoleRepository.find({where: {userId: user.id}});
    const {id, email} = user;

    return {
      token,
      id: id as string,
      email,
      roles: roles.map(r => r.roleId),
    };
  }
}

/////////////////////////////////////////////////////////////

// import {
//   Count,
//   CountSchema,
//   Filter,
//   FilterExcludingWhere,
//   repository,
//   Where,
// } from '@loopback/repository';
// import {
//   post,
//   param,
//   get,
//   getFilterSchemaFor,
//   getModelSchemaRef,
//   getWhereSchemaFor,
//   patch,
//   put,
//   del,
//   requestBody,
// } from '@loopback/rest';
// import {User} from '../models';
// import {UserRepository} from '../repositories';

// export class UserControllerController {
//   constructor(
//     @repository(UserRepository)
//     public userRepository : UserRepository,
//   ) {}

//   @post('/users', {
//     responses: {
//       '200': {
//         description: 'User model instance',
//         content: {'application/json': {schema: getModelSchemaRef(User)}},
//       },
//     },
//   })
//   async create(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(User, {
//             title: 'NewUser',
//             exclude: ['id'],
//           }),
//         },
//       },
//     })
//     user: Omit<User, 'id'>,
//   ): Promise<User> {
//     return this.userRepository.create(user);
//   }

//   @get('/users/count', {
//     responses: {
//       '200': {
//         description: 'User model count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async count(
//     @param.where(User) where?: Where<User>,
//   ): Promise<Count> {
//     return this.userRepository.count(where);
//   }

//   @get('/users', {
//     responses: {
//       '200': {
//         description: 'Array of User model instances',
//         content: {
//           'application/json': {
//             schema: {
//               type: 'array',
//               items: getModelSchemaRef(User, {includeRelations: true}),
//             },
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.filter(User) filter?: Filter<User>,
//   ): Promise<User[]> {
//     return this.userRepository.find(filter);
//   }

//   @patch('/users', {
//     responses: {
//       '200': {
//         description: 'User PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async updateAll(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(User, {partial: true}),
//         },
//       },
//     })
//     user: User,
//     @param.where(User) where?: Where<User>,
//   ): Promise<Count> {
//     return this.userRepository.updateAll(user, where);
//   }

//   @get('/users/{id}', {
//     responses: {
//       '200': {
//         description: 'User model instance',
//         content: {
//           'application/json': {
//             schema: getModelSchemaRef(User, {includeRelations: true}),
//           },
//         },
//       },
//     },
//   })
//   async findById(
//     @param.path.string('id') id: string,
//     @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
//   ): Promise<User> {
//     return this.userRepository.findById(id, filter);
//   }

//   @patch('/users/{id}', {
//     responses: {
//       '204': {
//         description: 'User PATCH success',
//       },
//     },
//   })
//   async updateById(
//     @param.path.string('id') id: string,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(User, {partial: true}),
//         },
//       },
//     })
//     user: User,
//   ): Promise<void> {
//     await this.userRepository.updateById(id, user);
//   }

//   @put('/users/{id}', {
//     responses: {
//       '204': {
//         description: 'User PUT success',
//       },
//     },
//   })
//   async replaceById(
//     @param.path.string('id') id: string,
//     @requestBody() user: User,
//   ): Promise<void> {
//     await this.userRepository.replaceById(id, user);
//   }

//   @del('/users/{id}', {
//     responses: {
//       '204': {
//         description: 'User DELETE success',
//       },
//     },
//   })
//   async deleteById(@param.path.string('id') id: string): Promise<void> {
//     await this.userRepository.deleteById(id);
//   }
// }
