class LocalStorageMock {
  private store = {};

  public clear() {
    this.store = {};
  }

  public getItem(key) {
    return this.store[key] || null;
  }

  public setItem(key, value) {
    this.store[key] = value.toString();
  }

  public removeItem(key) {
    delete this.store[key];
  }
};

(global as any).localStorage = new LocalStorageMock();