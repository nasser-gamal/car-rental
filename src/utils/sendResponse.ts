import { Response } from 'express';
import { IApiResponse } from '../interfaces/i-response';

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const ResponseData: IApiResponse<T> = {
    status: data.status || 'success',
    statusCode: data.statusCode,
    message: data?.message || null,
    meta: data.meta || null,
    data: data?.data || null,
  };


  res.status(ResponseData.statusCode).json(ResponseData);
};

export default sendResponse;
