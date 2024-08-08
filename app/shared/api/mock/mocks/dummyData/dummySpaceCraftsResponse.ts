import { SpacecraftsResponse } from '~/entities/spacecraft/models';

export const DUMMY_SPACECRAFTS_RESPONSE: SpacecraftsResponse = {
  page: {
    pageNumber: 0,
    pageSize: 2,
    numberOfElements: 2,
    totalElements: 2,
    totalPages: 1,
    firstPage: true,
    lastPage: false,
  },
  sort: {
    clauses: [],
  },
  spacecrafts: [
    {
      uid: 'test1',
      name: 'SS Mariposa',
      registry: 'NAR-7678',
      status: 'Destroyed',
      dateStatus: '22nd century',
      spacecraftClass: null,
      owner: null,
      operator: {
        uid: 'ORMA0000010494',
        name: 'United Nations',
      },
      affiliation: null,
    },
    {
      uid: 'test2',
      name: 'SS Santa Maria',
      registry: 'BDR-529',
      status: 'Cannibalized',
      dateStatus: '2360',
      spacecraftClass: null,
      owner: null,
      operator: null,
      affiliation: null,
    },
  ],
};
