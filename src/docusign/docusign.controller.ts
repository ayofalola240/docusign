import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthDto } from 'src/dtos/auth.dto';
import { EnvelopeDto } from 'src/dtos/envelop.dto';
import { SendDocumentDto } from 'src/dtos/send-document.dto';
import { imageFileFilter } from 'utils/file-helper';
import { DocusignService } from './docusign.service';

export class FileIdDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: '12344',
    description: 'File Id',
  })
  FileId: string;
}
export const uploadFile =
  (fileName = 'file'): MethodDecorator =>
  (target: any, propertyKey, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
@Controller('docusign')
export class DocusignController {
  constructor(private readonly docusignService: DocusignService) {}
  @ApiOperation({ summary: 'Get authorization details' })
  @ApiCreatedResponse({
    type: AuthDto,
  })
  @ApiBadRequestResponse({ description: 'consent_required' })
  @Get('/auth')
  async getAuth(@Request() req: any) {
    const body = await this.docusignService.authenticate();
    if (body && body.consentUrl) {
      req.redirect(body.consentUrl);
    }
    return body;
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload pdf Document to be sent to docusign' })
  @ApiOkResponse({
    description: 'File successfully uploaded',
    type: FileIdDto,
  })
  @ApiBadRequestResponse({ description: 'Only PDF files are allowed!' })
  @uploadFile('file')
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueId = Math.floor(10000 + Math.random() * 90000);
          const extension = extname(file.originalname);
          cb(null, uniqueId + extension);
        },
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
      },
    }),
  )
  async uploadFile(@UploadedFile() file, @Req() req: any) {
    try {
      if (!file || req.fileValidationError) {
        throw new BadRequestException('Only PDF files are allowed!');
      }
      return {
        message: 'File successfully uploaded',
        FileID: file.filename.split('.')[0],
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/send-document')
  @ApiOperation({ summary: 'Send Document to docusign' })
  @ApiOkResponse({
    type: EnvelopeDto,
  })
  async sendDocument(@Body() body: SendDocumentDto) {
    return await this.docusignService.sendDocument(body);
  }
}
