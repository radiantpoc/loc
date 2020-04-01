import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Address } from '../models';
import { AddressRepository } from '../repositories';
export declare class AddressController {
    addressRepository: AddressRepository;
    constructor(addressRepository: AddressRepository);
    create(address: Omit<Address, 'id'>): Promise<Address>;
    count(where?: Where<Address>): Promise<Count>;
    find(filter?: Filter<Address>): Promise<Address[]>;
    updateAll(address: Address, where?: Where<Address>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Address>): Promise<Address>;
    updateById(id: string, address: Address): Promise<void>;
    replaceById(id: string, address: Address): Promise<void>;
    deleteById(id: string): Promise<void>;
}
