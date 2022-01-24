import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoCoinController } from '../web/rest/crypto-coin.controller';
import { CryptoCoinRepository } from '../repository/crypto-coin.repository';
import { CryptoCoinService } from '../service/crypto-coin.service';
import { PublicCryptoCoinController } from '../web/rest/public.crypto-coin.controller';


@Module({
  imports: [TypeOrmModule.forFeature([CryptoCoinRepository]),HttpModule],
  controllers: [CryptoCoinController,PublicCryptoCoinController],
  providers: [CryptoCoinService],
  exports: [CryptoCoinService],
})
export class CryptoCoinModule {}
