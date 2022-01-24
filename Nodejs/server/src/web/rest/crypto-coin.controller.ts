import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CryptoCoinDTO } from '../../service/dto/crypto-coin.dto';
import { CryptoCoinService } from '../../service/crypto-coin.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard,  Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/pcryptocoin')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('pcryptocoin')
export class CryptoCoinController {
  logger = new Logger('CryptoCoinController');

  constructor(private readonly cryptoCoinService: CryptoCoinService) {}


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CryptoCoinDTO,
  })
  async getAll(@Req() req: Request): Promise<CryptoCoinDTO []>  {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.cryptoCoinService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CryptoCoinDTO,
  })
  async getOne(@Param('id') id: string): Promise<CryptoCoinDTO>  {
    return await this.cryptoCoinService.findById(id);
  }

  
  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create cryptoCoin' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CryptoCoinDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cryptoCoinDTO: CryptoCoinDTO): Promise<CryptoCoinDTO>  {
    const created = await this.cryptoCoinService.save(cryptoCoinDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CryptoCoin', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update cryptoCoin' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CryptoCoinDTO,
  })
  async put(@Req() req: Request, @Body() cryptoCoinDTO: CryptoCoinDTO): Promise<CryptoCoinDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CryptoCoin', cryptoCoinDTO.id);
    return await this.cryptoCoinService.update(cryptoCoinDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update cryptoCoin with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CryptoCoinDTO,
  })
  async putId(@Req() req: Request, @Body() cryptoCoinDTO: CryptoCoinDTO): Promise<CryptoCoinDTO>  {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CryptoCoin', cryptoCoinDTO.id);
    return await this.cryptoCoinService.update(cryptoCoinDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete cryptoCoin' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void>  {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CryptoCoin', id);
    return await this.cryptoCoinService.deleteById(id);
  }
}
