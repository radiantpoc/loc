import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {secured, SecuredType} from '../auth';
import {Address} from '../models';
import {AddressRepository} from '../repositories';

export class AddressController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) {}

  @post('/addresses', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  @secured(SecuredType.IS_AUTHENTICATED)
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddress',
            exclude: ['id'],
          }),
        },
      },
    })
    address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.addressRepository.create(address);
  }

  @get('/addresses/count', {
    responses: {
      '200': {
        description: 'Address model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @secured(SecuredType.IS_AUTHENTICATED)
  async count(
    @param.where(Address) where?: Where<Address>,
  ): Promise<Count> {
    return this.addressRepository.count(where);
  }

  @get('/addresses', {
    responses: {
      '200': {
        description: 'Array of Address model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Address, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @secured(SecuredType.IS_AUTHENTICATED)
  async find(
    @param.filter(Address) filter?: Filter<Address>,
  ): Promise<Address[]> {
    return this.addressRepository.find(filter);
  }

  @patch('/addresses', {
    responses: {
      '200': {
        description: 'Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @secured(SecuredType.IS_AUTHENTICATED)
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Address,
    @param.where(Address) where?: Where<Address>,
  ): Promise<Count> {
    return this.addressRepository.updateAll(address, where);
  }

  @get('/addresses/{id}', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Address, {includeRelations: true}),
          },
        },
      },
    },
  })
  @secured(SecuredType.IS_AUTHENTICATED)
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Address, {exclude: 'where'}) filter?: FilterExcludingWhere<Address>
  ): Promise<Address> {
    return this.addressRepository.findById(id, filter);
  }

  @patch('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address PATCH success',
      },
    },
  })
  @secured(SecuredType.IS_AUTHENTICATED)
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Address,
  ): Promise<void> {
    await this.addressRepository.updateById(id, address);
  }

  @put('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address PUT success',
      },
    },
  })
  @secured(SecuredType.IS_AUTHENTICATED)
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() address: Address,
  ): Promise<void> {
    await this.addressRepository.replaceById(id, address);
  }

  @del('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address DELETE success',
      },
    },
  })
  @secured(SecuredType.IS_AUTHENTICATED)
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.addressRepository.deleteById(id);
  }
}
