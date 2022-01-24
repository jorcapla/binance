/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column} from 'typeorm';
import { BaseEntity } from './base/base.entity';




/**
 * A CryptoCoin.
 */
@Entity('crypto_coin')
export class CryptoCoin extends BaseEntity  {

    @Column({name: "symbol", nullable: true})
    symbol: string;

    @Column({type: 'float' ,name: "price", nullable: true})
    price: number;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
