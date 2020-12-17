class LocalStorageMock {
  public store = {};

  public clear() {
    this.store = {};
  }

  public getItem(key: string) {
    return this.store[key] || null;
  }

  public setItem(key: string, value: any) {
    // console.log('setItem:', key, value);
    this.store[key] = value.toString();
  }

  public removeItem(key: string) {
    delete this.store[key];
  }
};

// console.log('localStorage:', 'xxx');
(global as any).localStorage = new LocalStorageMock();