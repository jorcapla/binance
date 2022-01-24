import { Injectable, HttpException, HttpStatus, Logger, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CryptoCoinDTO }  from '../service/dto/crypto-coin.dto';
import { CryptoCoinMapper }  from '../service/mapper/crypto-coin.mapper';
import { CryptoCoinRepository } from '../repository/crypto-coin.repository';


const relationshipNames = [];


@Injectable()
export class CryptoCoinService {
  
    logger = new Logger('CryptoCoinService');

    constructor(@InjectRepository(CryptoCoinRepository) private cryptoCoinRepository: CryptoCoinRepository , private readonly httpService: HttpService) {}


      async getPrice(): Promise<any | undefined> {
        const cryptoCoinDTO = new CryptoCoinDTO();
        cryptoCoinDTO.price = 1.0;
        cryptoCoinDTO.symbol ="BTCUSDT";
        //return cryptoCoinDTO;
        const url = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";
        const response = await this.httpService.get(url).toPromise();
        return response.data;
        
    
      }
      async findById(id: string): Promise<CryptoCoinDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.cryptoCoinRepository.findOne(id, options);
        return CryptoCoinMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<CryptoCoinDTO>): Promise<CryptoCoinDTO | undefined> {
        const result = await this.cryptoCoinRepository.findOne(options);
        return CryptoCoinMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<CryptoCoinDTO>): Promise<[CryptoCoinDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.cryptoCoinRepository.findAndCount(options);
        const cryptoCoinDTO: CryptoCoinDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(cryptoCoin => cryptoCoinDTO.push(CryptoCoinMapper.fromEntityToDTO(cryptoCoin)));
            resultList[0] = cryptoCoinDTO;
        }
        return resultList;
      }

      async save(cryptoCoinDTO: CryptoCoinDTO, creator?: string): Promise<CryptoCoinDTO | undefined> {
        const entity = CryptoCoinMapper.fromDTOtoEntity(cryptoCoinDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.cryptoCoinRepository.save(entity);
        return CryptoCoinMapper.fromEntityToDTO(result);
      }

      async update(cryptoCoinDTO: CryptoCoinDTO, updater?: string): Promise<CryptoCoinDTO | undefined> {
        const entity = CryptoCoinMapper.fromDTOtoEntity(cryptoCoinDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        await this.cryptoCoinRepository.update(entity.id, entity);
        return cryptoCoinDTO;
      }

      async deleteById(id: string): Promise<void | undefined> {
        await this.cryptoCoinRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
