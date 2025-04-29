/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';

declare global {
  namespace Express {
    export interface AuthInfo {
      redirectUrl?: string;
    }
  }
}
