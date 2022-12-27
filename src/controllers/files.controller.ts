import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { editFileName } from '@utils/file-utils';

@ApiTags('files')
@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      originalname: file.originalname,
      filename: file.filename,
      location: `https://api.escuelajs.co/api/v1/files/${file.filename}`,
    };
  }

  @Get(':filename')
  seeUploadedFile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './upload' });
  }
}
