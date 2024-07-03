class StorageService {
  private key: string;

  private service: Storage = localStorage;

  constructor(key: string) {
    this.key = key;
  }

  public setData(value: string): void {
    this.service.setItem(this.key, value);
  }

  public getData(): string | null {
    return this.service.getItem(this.key);
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export default StorageService;
