import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class signHereDto {
  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty({
    type: String,
    example: '12344',
    description: 'documentId',
  })
  readonly documentId: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty({
    type: String,
    example: '1',
    description: 'pageNumber',
  })
  readonly pageNumber: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty({
    type: String,
    example: '100',
    description: 'xPosition',
  })
  readonly xPosition: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty({
    type: String,
    example: '100',
    description: 'yPosition',
  })
  readonly yPosition: string;
}

class ResipientDto {
  @IsEmail()
  @Expose()
  @ApiProperty({
    type: String,
    example: 'johnDoe@example.com',
    description: 'email',
  })
  readonly email: string;

  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'name',
  })
  readonly name: string;

  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    example: '1',
    description: 'recipientId',
  })
  readonly recipientId: string;

  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    example: '1',
    description: 'routingOrder',
  })
  readonly routingOrder: string;

  //   @IsNotEmpty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => signHereDto)
  readonly signHereTabs: signHereDto[];
}

export class SendDocumentDto {
  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty({
    type: String,
    example: '12344',
    description: 'fileId',
  })
  readonly fileId: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty({
    type: String,
    example: 'My Document',
    description: 'fileName',
  })
  readonly fileName: string;

  @ApiProperty({
    type: [Object],
    example: [
      {
        name: 'Ayo Falola',
        email: 'ayofalola240@gmail.com',
        recipientId: '1',
        routingOrder: '1',
        signHereTabs: [
          {
            documentId: '10412',
            pageNumber: '1',
            xPosition: '100',
            yPosition: '100',
          },
        ],
      },
      {
        name: 'John Doe',
        email: 'myfynBoy1@gmail.com',
        recipientId: '2',
        routingOrder: '2',
      },
    ],
    description: 'recipients',
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ResipientDto)
  readonly recipients: ResipientDto[];
}
