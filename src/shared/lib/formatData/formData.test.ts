import formatData from './formatData';

describe('formatData', () => {
  it('should return formatted string', () => {
    const data = [
      {
        uid: 'test1',
        name: 'test1',
        spacecraftClass: null,
        owner: null,
        operator: null,
        affiliation: null,
        registry: null,
        status: 'active',
        dateStatus: '2021-01-01T00:00:00.000Z',
      },
    ];

    const result = formatData(data);

    expect(result).toBe('Uid,Spacecraft,Status,Date\ntest1,test1,active,2021-01-01T00:00:00.000Z\n');
  });
});
