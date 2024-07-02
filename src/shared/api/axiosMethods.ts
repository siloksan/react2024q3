import { AxiosRequestConfig } from 'axios';
import { SpacecraftsResponse } from 'entities/spacecraft/models';
import axiosInstance from './axios';

async function getData(endpoint: string, options: AxiosRequestConfig = {}): Promise<SpacecraftsResponse | null> {
  try {
    const response = await axiosInstance.get(endpoint, options);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
  return null;
}

export default getData;
