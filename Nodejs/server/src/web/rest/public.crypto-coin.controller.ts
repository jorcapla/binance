import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CryptoCoinDTO } from '../../service/dto/crypto-coin.dto';
import { CryptoCoinService } from '../../service/crypto-coin.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard,  Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/cryptocoin')
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiUseTags('public-cryptocoin')
export class PublicCryptoCoinController {
  logger = new Logger('CryptoCoinController');

  constructor(private readonly cryptoCoinService: CryptoCoinService) {}


  @Get('/price')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CryptoCoinDTO,
  })
  async getPrice(): Promise<CryptoCoinDTO>  {
    return await this.cryptoCoinService.getPrice();
  }

}
