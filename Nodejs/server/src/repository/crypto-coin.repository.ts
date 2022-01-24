import { EntityRepository, Repository } from 'typeorm';
import { CryptoCoin } from '../domain/crypto-coin.entity';

@EntityRepository(CryptoCoin)
export class CryptoCoinRepository extends Repository<CryptoCoin> {}
