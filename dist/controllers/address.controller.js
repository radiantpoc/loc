"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const auth_1 = require("../auth");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let AddressController = class AddressController {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async create(address) {
        return this.addressRepository.create(address);
    }
    async count(where) {
        return this.addressRepository.count(where);
    }
    async find(filter) {
        return this.addressRepository.find(filter);
    }
    async updateAll(address, where) {
        return this.addressRepository.updateAll(address, where);
    }
    async findById(id, filter) {
        return this.addressRepository.findById(id, filter);
    }
    async updateById(id, address) {
        await this.addressRepository.updateById(id, address);
    }
    async replaceById(id, address) {
        await this.addressRepository.replaceById(id, address);
    }
    async deleteById(id) {
        await this.addressRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/addresses', {
        responses: {
            '200': {
                description: 'Address model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Address) } },
            },
        },
    }),
    auth_1.secured(auth_1.SecuredType.IS_AUTHENTICATED),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Address, {
                    title: 'NewAddress',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/addresses/count', {
        responses: {
            '200': {
                description: 'Address model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    auth_1.secured(auth_1.SecuredType.IS_AUTHENTICATED),
    tslib_1.__param(0, rest_1.param.where(models_1.Address)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/addresses', {
        responses: {
            '200': {
                description: 'Array of Address model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Address, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    auth_1.secured(auth_1.SecuredType.IS_AUTHENTICATED),
    tslib_1.__param(0, rest_1.param.filter(models_1.Address)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/addresses', {
        responses: {
            '200': {
                description: 'Address PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    auth_1.secured(auth_1.SecuredType.IS_AUTHENTICATED),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Address, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Address)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Address, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/addresses/{id}', {
        responses: {
            '200': {
                description: 'Address model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Address, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    auth_1.secured(auth_1.SecuredType.IS_AUTHENTICATED),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Address, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/addresses/{id}', {
        responses: {
            '204': {
                description: 'Address PATCH success',
            },
        },
    }),
    auth_1.secured(auth_1.SecuredType.IS_AUTHENTICATED),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Address, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Address]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/addresses/{id}', {
        responses: {
            '204': {
                description: 'Address PUT success',
            },
        },
    }),
    auth_1.secured(auth_1.SecuredType.IS_AUTHENTICATED),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Address]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/addresses/{id}', {
        responses: {
            '204': {
                description: 'Address DELETE success',
            },
        },
    }),
    auth_1.secured(auth_1.SecuredType.IS_AUTHENTICATED),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AddressController.prototype, "deleteById", null);
AddressController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.AddressRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.AddressRepository])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map