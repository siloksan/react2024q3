import { SpacecraftsResponse } from 'entities/spacecraft/models';

export const DUMMY_SPACE_CRAFTS_RESPONSE: SpacecraftsResponse = {
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
      uid: 'SRMA0000005229',
      name: 'SS Mariposa',
      registry: 'NAR-7678',
      status: 'Destroyed',
      dateStatus: '22nd century',
      spacecraftClass: {
        uid: 'SCMA0000004980',
        name: 'DY-500 class',
      },
      owner: null,
      operator: {
        uid: 'ORMA0000010494',
        name: 'United Nations',
      },
      affiliation: null,
    },
    {
      uid: 'SRMA0000235415',
      name: 'SS Santa Maria',
      registry: 'BDR-529',
      status: 'Cannibalized',
      dateStatus: '2360',
      spacecraftClass: {
        uid: 'SCMA0000010005',
        name: 'Erewon class',
      },
      owner: null,
      operator: null,
      affiliation: null,
    },
  ],
};
