import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { AppServerError } from "../models/jwtToken";
import { AppPagination, PaginationRequest, PaginationResponse } from '../models/pagination';

export interface IFileStatus {
    isSuccess?: boolean;
    errorMessage?: string;
}

export class UtilityHelpers
{
  public static dataURLtoFile(dataurl: string, filename: string): File {
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

  public static validateFile(file: any): IFileStatus {
    if (file.size > 200000) {
      return { isSuccess: false, errorMessage:  'File should no be greater 2MB'}
    }

    return { isSuccess: true, errorMessage: undefined };
  }

  public static validateFileName(fileName?: string): IFileStatus {

    if (!fileName) {
      return { isSuccess: false, errorMessage:  'File name is required'}
    }

    if (fileName.length <= 0) {
      return { isSuccess: false, errorMessage:  'File name is required'}
    }

    const pattern = new RegExp('^[a-zA-Z0-9._ ]*$');

    const result = pattern.test(fileName ?? '');

    if (!result) {
      return { isSuccess: false, errorMessage:  'Only letters, numbers, periods and underscore'}
    }

    return { isSuccess: true, errorMessage: undefined };
  }

  public static showError(error: any, toast: CustomToastService): string {
    // console.log(error);
    const serverError = error.error as AppServerError;

    if (serverError.error && serverError.error.length > 0) {
      toast.error(serverError.error);

      return serverError.error;
    }

    if (serverError.errors && serverError.errors.length > 0) {
      const errors = serverError.errors as any[];
      errors.forEach(x => {
        x.fieldErrors.forEach((ele: string) => {
          toast.error(ele);
        });
      });
    }

    return '';
  }

  public static isUUID (uuid: string) {
    let s = "" + uuid;

    let is = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (is === null) {
      return false;
    }
    return true;
  }

  public static initializePagination<T, Tfilter>(initialFilter: Tfilter) {
    let elements: T[] = [];
    let appPagination = new AppPagination();
    let filter: Tfilter = initialFilter;
    let paginationRequest = new PaginationRequest<Tfilter>(appPagination, filter);
    let paginationResponse = new PaginationResponse<T[]>();

    return {
      elements, appPagination, filter, paginationRequest, paginationResponse
    }
  }

  static async resizeAndCompressImage(file: File, max_width: number = 1000, max_height: number = 1000) {

    const img = new Image();
    window.URL = window.URL || window.webkitURL;
    var blobURL = window.URL.createObjectURL(file);
    img.src = blobURL;
    await img.decode();

    var canvas = document.createElement('canvas');

    var width = img.width;
    var height = img.height;

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

    // resize the canvas and draw the image data into it
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0, width, height);

    const base64 = canvas.toDataURL("image/jpeg",0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)
    const blob = await fetch(base64).then(res => res.blob());

    return new File([blob], Math.random().toString(), { type: blob.type });

  }

  static groupBy(arr: any[], key: string) {
    return arr.reduce((acc, cur) => {
        const groupKey = cur[key];
        acc[groupKey] = acc[groupKey] || [];
        acc[groupKey].push(cur);
        return acc;
    }, {});
  }
}
