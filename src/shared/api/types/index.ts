export interface SpaceCraftsRequestParams {
  endpoint: string;
  payload: {
    name: string;
    registry: string;
    status: string;
  };
  params: {
    pageNumber: number;
    pageSize: number;
  };
}
