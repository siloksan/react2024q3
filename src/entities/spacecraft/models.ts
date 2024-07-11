import { Page } from 'entities/pages/models';

interface Options {
  uid: string;
  name: string;
}

export interface SpacecraftClass {
  uid: string;
  name: string;
  numberOfDecks: string | null;
  crew: string;
  warpCapable: boolean;
  mirror: boolean;
  alternateReality: boolean;
  activeFrom: string;
  activeTo: string;
  species: string | null;
}

export interface Spacecraft {
  uid: string;
  name: string;
  registry: string | null;
  status: string;
  dateStatus: string;
  spacecraftClass: SpacecraftClass | null;
  owner: Options | null;
  operator: Options | null;
  affiliation: null;
}

export interface SpacecraftsResponse {
  page: Page;
  sort: { clauses: string[] };
  spacecrafts: Spacecraft[];
}
