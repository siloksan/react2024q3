import { Page } from 'entities/pages/models';

interface Options {
  uid: string;
  name: string;
}

export interface Spacecraft {
  uid: string;
  name: string;
  registry: string | null;
  status: string;
  dateStatus: string;
  spacecraftClass: Options | null;
  owner: Options | null;
  operator: Options | null;
  affiliation: null;
}

export interface SpacecraftsResponse {
  page: Page;
  sort: { clauses: string[] };
  spacecrafts: Spacecraft[];
}
