/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';




/**
 * A CryptoCoinDTO object.
 */
export class CryptoCoinDTO extends BaseDTO {

            @ApiModelProperty({description: 'symbol field', required: false})
        symbol: string;

            @ApiModelProperty({description: 'price field', required: false})
        price: number;


        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
