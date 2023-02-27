import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class signHereDto {
  @IsString()
  readonly documentId: string;

  @IsString()
  readonly pageNumber: string;

  @IsString()
  readonly xPosition: string;

  @IsString()
  readonly yPosition: string;
}

class ResipientDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly recipientId: string;

  @IsString()
  readonly routingOrder: string;

  //   @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => signHereDto)
  readonly signHereTabs: signHereDto[];
}

export class SendDocumentDto {
  @IsString()
  readonly fileId: string;

  @IsString()
  readonly fileName: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ResipientDto)
  readonly recipients: ResipientDto[];
}
