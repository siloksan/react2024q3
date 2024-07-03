import { AxiosRequestConfig } from 'axios';
import { SpacecraftsResponse } from 'entities/spacecraft/models';
import axiosInstance from './axios';
import Payload from './types/apiTypes';

async function getData(
  endpoint: string,
  payload: Payload,
  options: AxiosRequestConfig = {}
): Promise<SpacecraftsResponse> {
  const response = await axiosInstance.post(endpoint, payload, options);
  return response.data;
}

export default getData;
