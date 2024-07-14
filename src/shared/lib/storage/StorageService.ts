class StorageService {
  private service: Storage = localStorage;

  public setData(key: string, value: string): void {
    this.service.setItem(key, value);
  }

  public getData(key: string): string | null {
    return this.service.getItem(key);
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export default StorageService;
