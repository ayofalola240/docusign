import { Module } from '@nestjs/common';
import { DocusignService } from './docusign.service';
import { DocusignController } from './docusign.controller';

@Module({
  providers: [DocusignService],
  controllers: [DocusignController],
})
export class DocusignModule {}
