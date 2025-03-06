export class LocalStorageUtils {
  //PUBLIC STATIC FUNCTIONS
  public static setLocalStorageItem(keysAndValues: Record<string, any>): void {
    const entries = Object.entries(keysAndValues);

    for (const [key, value] of entries) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  public static getLocalStorageItem(item: string, defaultResponse: any): any {
    const localStorageItemValue = localStorage.getItem(item);

    return localStorageItemValue ? JSON.parse(localStorageItemValue) : defaultResponse;
  }
}
