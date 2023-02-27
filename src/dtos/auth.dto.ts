import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthDto {
  @Expose()
  @ApiProperty({
    type: String,
    example:
      'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAaVpY7xfbSAgAgNEeuvcX20gCAOQxgKcKAhNNroyl4e2_kQwVAAEAAAAYAAIAAAAFAAAAHQAAAA0AJAAAADc2NWNmMTFjLWRhODEtNDkxYi1iMGE1LTc3OTI3N2RmNDBkZSIAJAAAADc2NWNmMTFjLWRhODEtNDkxYi1iMGE1LTc3OTI3N2RmNDBkZRIAAQAAAAYAAABqd3RfYnIjACQAAAA3NjVjZjExYy1kYTgxLTQ5MWItYjBhNS03NzkyNzdkZjQwZGU',
    description: 'Access Token',
  })
  accessToken: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '93b82949-e460-4615-8bbd-da279663ff0f',
    description: 'Api account Id',
  })
  apiAccountId: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'https://demo.docusign.net/restapi',
    description: 'Base path',
  })
  basePath: string;
}
