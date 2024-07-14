import { AxiosRequestConfig } from 'axios';
import { Spacecraft, SpacecraftsResponse } from 'entities/spacecraft/models';
import axiosInstance from './axios';
import Payload from './types/apiTypes';

async function getSpaceCrafts(
  endpoint: string,
  payload: Payload,
  options: AxiosRequestConfig = {}
): Promise<SpacecraftsResponse> {
  const response = await axiosInstance.post(endpoint, payload, options);
  return response.data;
}

async function getSpaceCraftDetails(endpoint: string, options: AxiosRequestConfig = {}): Promise<Spacecraft> {
  const response = await axiosInstance.get(endpoint, options);
  return response.data.spacecraft;
}

export { getSpaceCrafts, getSpaceCraftDetails };
