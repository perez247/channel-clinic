import { Injectable } from '@angular/core';
import { EventBusService } from '../event-bus/event-bus.service';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { Observable, from } from 'rxjs';

@Injectable()
export class ImageService {
  constructor() {
  }

  public dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const firstArr = arr[0];
    const mime1 = firstArr.match(/:(.*?);/) ?? {} as RegExpMatchArray;
    const mime = mime1[1]
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  public blobToImage(blob: Blob): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Failed to convert Blob to Image.'));
          img.src = URL.createObjectURL(blob);
      });
  }

  async fileToBase64(file: any): Promise<any> {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
      });
    }
  
    async FileToHTMLImageTag(file: File): Promise<HTMLImageElement> {
      window.URL = window.URL || window.webkitURL;
      var blobURL = window.URL.createObjectURL(file);
  
      return await this.urlToHTMLImageTag(blobURL);
    }
  
    async urlToHTMLImageTag(url: string): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to convert Blob to Image.'));
        img.crossOrigin = "anonymous";
        img.src = url;
      });
    }

  async HTMLimageTagToBlob(img: HTMLImageElement, width: number, height: number, quality: number = 0.7): Promise<Blob> {        
      const base64 = this.imageToBase64(img, width, height, quality)// get the data from canvas as 70% JPG (can be also PNG, etc.)
      const b = await fetch(base64).then(res => res.blob());
      return b;
  }

  imageToBase64(img: HTMLImageElement, width: number, height: number, quality: number = 0.7): string {
      const canvas = document.createElement('canvas');
      // resize the canvas and draw the image data into it
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      
      return canvas.toDataURL("image/jpeg", quality);
  } 

  async compressImage(file: File, requiredSize: number = 1, maxWidth?: number, maxHeight?: number): Promise<File> {
      const htmlFile = await this.FileToHTMLImageTag(file);
      maxWidth = maxWidth ? maxWidth : htmlFile.width;
      maxHeight = maxHeight ? maxHeight : htmlFile.height;
      
      if (file.size > (requiredSize * 1000000) || htmlFile.width > maxWidth * 1.5 || htmlFile.height > maxHeight * 1.5 ) {
          const blob = await this.resizeAndCompressFile(file, maxWidth, maxHeight, .8);
          const newFile = new File([blob], Math.random().toString(), { type: blob.type });

          return await this.compressImage(newFile, requiredSize, maxWidth, maxHeight);
      } else {
          return file;
      }
  }

  async resizeAndCompressFile(file: File | string, max_width: number = 1000, max_height: number = 1000, quality: number = .8) {
      const img = typeof file == 'string' ? await this.urlToHTMLImageTag(file) : await this.FileToHTMLImageTag(file);
      const newSizes = this.resizeWidthAndHeight(img.width, img.height, max_width, max_height);
      return this.HTMLimageTagToBlob(img, newSizes.width, newSizes.height, quality);
  }

  resizeWidthAndHeight(width: number, height: number, max_width: number = 1000, max_height: number = 1000): { width: number, height: number }
  {
      // calculate the width and height, constraining the proportions
      if (width > height) {
          if (width > max_width) {
            //height *= max_width / width;
            height = Math.round(height *= max_width / width);
            width = max_width;
          }
        } else {
          if (height > max_height) {
            //width *= max_height / height;
            width = Math.round(width *= max_height / height);
            height = max_height;
          }
        }
      
        return { width, height };
  }

  compressBase64(base64: string, targetSizeKB: number = 500): Observable<string> {
    return from(new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Unable to get canvas context'));
          return;
        }

        let width = img.width;
        let height = img.height;
        const aspectRatio = width / height;

        // Calculate new dimensions to maintain aspect ratio
        if (width > height) {
          width = Math.sqrt(targetSizeKB * 1000 * aspectRatio);
          height = width / aspectRatio;
        } else {
          height = Math.sqrt(targetSizeKB * 1000 / aspectRatio);
          width = height * aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress the image
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG and convert to base64
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedBase64);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = base64;
    }));
  }
}
