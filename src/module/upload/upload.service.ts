import { Injectable } from '@nestjs/common';
import * as COS from 'cos-nodejs-sdk-v5';

@Injectable()
export class FileUploadService {
  private readonly cos;

  constructor() {
    this.cos = new COS({
      SecretId: process.env.SecretId,
      SecretKey: process.env.SecretKey,
    });
  }

  async uploadFile(file) {
    const params = {
      Bucket: process.env.Bucket,
      Region: process.env.Region,
      Key: file.originalname,
      Body: file.buffer,
    };

    return new Promise((resolve, reject) => {
      this.cos.putObject(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  }
}
