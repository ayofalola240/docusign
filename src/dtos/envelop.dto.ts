import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EnvelopeDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: '93b82949-e460-4615-8bbd-da279663ff0f',
    description: 'Envelope Id',
  })
  envelopeId: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'sent',
    description: 'status',
  })
  status: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '2023-02-27T02:54:26.3930000Z',
    description: 'statusDateTime',
  })
  statusDateTime: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '/envelopes/3ca62b97-6e9c-45a7-a4f3-eb57c8254f8b',
    description: 'uri',
  })
  uri: string;
}
