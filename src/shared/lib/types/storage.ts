interface StorageData {
  name: string | null;
  page: string | null;
  uid: string | null;
}

const storageKeys = {
  page: 'page',
  name: 'name',
  uid: 'uid',
};

export { type StorageData, storageKeys };
