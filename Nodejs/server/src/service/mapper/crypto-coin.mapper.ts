import { CryptoCoin } from '../../domain/crypto-coin.entity';
import { CryptoCoinDTO } from '../dto/crypto-coin.dto';


/**
 * A CryptoCoin mapper object.
 */
export class CryptoCoinMapper {

  static fromDTOtoEntity (entityDTO: CryptoCoinDTO): CryptoCoin {
    if (!entityDTO) {
      return;
    }
    let entity = new CryptoCoin();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: CryptoCoin): CryptoCoinDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new CryptoCoinDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
