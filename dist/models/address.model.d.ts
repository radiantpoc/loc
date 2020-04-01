import { Entity } from '@loopback/repository';
export declare class Address extends Entity {
    businessName: string;
    address1: string;
    address2?: string;
    suite: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    floor: string;
    direction: string;
    latitude: string;
    longitude: string;
    submittedTIme: string;
    userId: string;
    [prop: string]: any;
    constructor(data?: Partial<Address>);
}
export interface AddressRelations {
}
export declare type AddressWithRelations = Address & AddressRelations;
