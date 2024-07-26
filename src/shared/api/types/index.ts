export interface Payload {
  name: string;
  registry: string;
  status: string;
}

export interface QueryParams {
  [key: string]: string
}

interface SpaceCraftsParams {
  pageNumber: number;
  pageSize: number;
}

interface SpaceCraftParams {
  uid: string;
}

export interface SpaceCraftsRequestParams {
  endpoint: string;
  payload: {
    name: string;
    registry: string;
    status: string;
  };
  params: SpaceCraftsParams;
}

export interface SpaceCraftRequestParams {
  endpoint: string;
  params: SpaceCraftParams;
}
