import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
const fs = require('fs');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('submit')
  @UseInterceptors(FileInterceptor('uploadFile', { storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueName = uuid();
      cb(null, `${uniqueName}-${file.originalname}`);
    },
  }) }))
  async submitData(@UploadedFile() file, @Body() body) {

    console.log(body,file)

    let fileName = `${uuid()}.json`
    fs.writeFile(`data/${fileName}`, JSON.stringify({...body,fileName:file.filename}), err => {
      if (err) {
        console.error(err);
      }
    });
    return {
      success: true,
      message: "data saved successfully",
      fileName
    }
  }
}
