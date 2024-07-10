import { StorageData } from './storage';

export type SetStorageSearchParams = <Key extends keyof StorageData>(key: Key, value: StorageData[Key]) => void;
