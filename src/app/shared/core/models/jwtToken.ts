
export class JWTToken {
    nameid: string = '';
    nbf: number = -1;
    exp: number = -1;
    iat: number = -1;
    jwt: string = '';
    role: string[] = []
}

export const LocalJWTToken =
  `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhODcxZTFiNS0zMzQ1LTRmMTYtYWNhZC00YWRkZWY5ZmI4MWEiLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE2NzI5MzczMDgsImV4cCI6MTcwNDQ3MzYwOCwiaWF0IjoxNjcyOTM3NjA4fQ.wu26wKBEe2h3sfFK3a-VM2zmANYIwSLSEkWoyEle6LuBJ4-C7sRmj6CLpRNc_suQOuNGL7JCKyLAYdzNECBy_g`;

/**
 * @description Errors sent back from the server
 */
 export class AppServerError {
    error: string = '';
    environment: string = '';
    errors: any;
    stackTrace: string = '';
}
