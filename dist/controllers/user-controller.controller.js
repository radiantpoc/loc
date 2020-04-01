"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const util_1 = require("util");
const auth_1 = require("../auth");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const { sign } = require('jsonwebtoken');
const signAsync = util_1.promisify(sign);
let UserController = class UserController {
    constructor(userRepository, userRoleRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }
    async createUser(user) {
        return await this.userRepository.create(user);
    }
    async login(credentials) {
        if (!credentials.username || !credentials.password)
            throw new rest_1.HttpErrors.BadRequest('Missing Username or Password');
        const user = await this.userRepository.findOne({ where: { id: credentials.username } });
        if (!user)
            throw new rest_1.HttpErrors.Unauthorized('Invalid credentials');
        const isPasswordMatched = user.password === credentials.password;
        if (!isPasswordMatched)
            throw new rest_1.HttpErrors.Unauthorized('Invalid credentials');
        const tokenObject = { username: credentials.username };
        const token = await signAsync(tokenObject, auth_1.JWT_SECRET);
        const roles = await this.userRoleRepository.find({ where: { userId: user.id } });
        const { id, email } = user;
        return {
            token,
            id: id,
            email,
            roles: roles.map(r => r.roleId),
        };
    }
};
tslib_1.__decorate([
    rest_1.post('/users'),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
tslib_1.__decorate([
    rest_1.post('/users/login'),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.UserRoleRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        repositories_1.UserRoleRepository])
], UserController);
exports.UserController = UserController;
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
//# sourceMappingURL=user-controller.controller.js.map