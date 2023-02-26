import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { imageFileFilter } from 'utils/file-helper';
import { DocusignService } from './docusign.service';
// import path, { extname } from 'path';
// const demoDocsPath = path.resolve(__dirname, '../../uploads');

@Controller('docusign')
export class DocusignController {
  constructor(private readonly docusignService: DocusignService) {}

  @Get('/auth')
  async getAuth(@Request() req: any) {
    const body = await this.docusignService.authenticate();
    if (body && body.consentUrl) {
      req.redirect(body.consentUrl);
    }
    return body;
  }

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
        throw new BadRequestException('Only PDF or DOCX files are allowed!');
      }
      return file;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/send')
  async send() {
    return await await this.docusignService.sendDocument();
  }
}
